import { FaCaretDown, FaCheckCircle } from 'react-icons/fa';
import Button from '../components/Button';
import { useEffect, useRef, useState } from 'react';
import PostEditor from '../components/PostEditor';
import { twMerge } from 'tailwind-merge';
import ChooseCommunity from '../components/ChooseCommunity';
import { useNavigate, useParams } from 'react-router-dom';
import { validateEmptyContent } from '../utils/validators';
import ReactQuill from 'react-quill-new';
import PostHeadInput from '../components/PostHeadInput';
import { createPost } from '../services/postApi';
import { IoMdRemoveCircle } from 'react-icons/io';
import { customToast } from '../utils/customToast';
import { customConfirm } from '../utils/customConfirm';
import { fetchChannels } from '../services/channelApi';
import { getImagePreview } from '../utils/localImage';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [chooseList, setChooseList] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null); // 자식 컴포넌트에서 사용
  const contentRef = useRef<ReactQuill>(null); // 자식 컴포넌트에서 사용
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false); // 게시글 작성 중복방지
  const [isCancelling, setIsCancelling] = useState(false); // 작성 취소 중복방지

  const [cName, setCName] = useState('');
  const [cIcon, setCIcon] = useState('');
  const [cLink, setCLink] = useState('');
  const [cId, setCId] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // 채널 목록 불러오기
    const fetchChannelsData = async () => {
      try {
        const data = await fetchChannels();

        const index = parseInt(id ?? '0', 10);
        const currentChannel = data[index];

        if (currentChannel) {
          setCName(currentChannel.name);
          setCIcon(getImagePreview(currentChannel._id) || '');
          setCLink(String(index));
          setCId(currentChannel._id);
        }
      } catch (error) {
        console.error('채널 데이터를 불러오는 중 오류가 발생했습니다.', error);
      }
    };

    fetchChannelsData();
  }, [id]);

  const handleChannelChange = (
    channelName: string,
    channelIcon: string,
    channelLink: string,
    channelId: string,
  ) => {
    setCName(channelName);
    setCIcon(channelIcon);
    setChooseList(false);
    setCLink(channelLink);
    setCId(channelId);
  };

  const handleEditorChange = (value: string) => {
    setContent(value);
    if (!validateEmptyContent(value)) setContentError(false);
  };

  const handleImageChange = (file: File) => {
    console.log('선택된 이미지: ', file);
    setSelectedImage(file);

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
  };

  const handleCancel = async () => {
    if (isCancelling) return;
    setIsCancelling(true);

    if (!validateEmptyContent(content) || title) {
      const isConfirmed = await customConfirm(
        '작성 중인 내용이 있습니다.\n작성을 그만하시겠습니까?',
      );
      if (!isConfirmed) {
        setIsCancelling(false);
        return;
      }
    }
    try {
      await navigate(`/channel/${id}`);
    } catch {
      customToast(
        '동작 중에 오류가 발생했습니다. 다시 시도 해주세요!',
        'error',
      );
    } finally {
      setIsCancelling(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    let hasError = false;

    if (!cLink) {
      customToast('채널을 선택해주세요!', 'warning');
      setIsSubmitting(false);
      return;
    }

    if (title === '') {
      setTitleError(true);
      titleRef.current?.focus();
      hasError = true;
    } else {
      setTitleError(false);
    }

    if (validateEmptyContent(content)) {
      setContentError(true);
      if (!hasError) {
        contentRef.current?.focus();
      }
      hasError = true;
    } else {
      setContentError(false);
    }

    if (hasError) {
      setIsSubmitting(false);
      return;
    }
    const isConfirmed = await customConfirm('게시글을 등록하시겠습니까?');
    if (!isConfirmed) {
      setIsSubmitting(false);
      return;
    }

    try {
      await createPost({
        title: title + content,
        image: selectedImage || undefined,
        channelId: cId,
      });
      customToast(
        '게시물이 등록 되었습니다!',
        'success',
        <FaCheckCircle className="text-[var(--color-sub)]" />,
      );
      navigate(`/channel/${cLink}`);
    } catch (err) {
      customToast('게시글이 등록에 실패했습니다. 다시 시도해주세요.', 'error');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        className="container mx-auto mb-[50px] flex flex-col items-start justify-center gap-[26px]"
        onSubmit={handleSubmit}
      >
        <h2 className="textH2">게시글 작성</h2>
        <div className="relative z-30">
          <Button
            onClick={() => setChooseList(!chooseList)}
            className={twMerge(
              'btn-style-channelList',
              cName === '' ? '' : 'justify-start gap-2 p-4',
            )}
          >
            {cName === '' ? (
              <>
                <FaCaretDown className="mr-1" />
                <span className="textST1 text-[var(--color-gray7)]">
                  커뮤니티를 선택하세요
                </span>
              </>
            ) : (
              <>
                <img
                  className={twMerge('postProfile', 'h-[20px] w-[20px]')}
                  src={cIcon}
                  alt="icon"
                />
                <span className="text-[13px] text-[var(--color-text-black)]">
                  {cName}
                </span>
              </>
            )}
          </Button>
          {chooseList && <ChooseCommunity onChange={handleChannelChange} />}
        </div>
        {previewImage ? (
          <div className={twMerge('postBorder2', 'relative rounded-xl p-4')}>
            <img src={previewImage} alt="Preview" className="" />
            <Button
              onClick={() => {
                setPreviewImage('');
                setSelectedImage(null);
              }}
              className="removeImgBtn absolute top-2 right-2"
            >
              <IoMdRemoveCircle size={24} />
            </Button>
          </div>
        ) : (
          <div
            className={twMerge(
              'postBorder2',
              'text-base',
              'rounded-xl p-4 text-[var(--color-gray5)]',
            )}
          >
            선택된 이미지 없음
          </div>
        )}
        <PostHeadInput
          ref={titleRef}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (e.target.value !== '') setTitleError(false);
          }}
          className="input-style-head"
          placeholder="제목을 입력하세요"
        />
        {titleError && <p className="cautionMsg">제목을 입력해주세요.</p>}

        <PostEditor
          ref={contentRef}
          value={content}
          onChange={handleEditorChange}
          onImageChange={handleImageChange}
        />
        {contentError && <p className="cautionMsg">내용을 입력해주세요.</p>}

        <div className="flex w-full justify-end gap-4">
          <Button
            type="reset"
            onClick={handleCancel}
            className={twMerge('btn-style-comment', 'textBasic h-10 px-5')}
            disabled={isCancelling}
          >
            취소
          </Button>

          <Button
            type="submit"
            className={twMerge(
              'btn-style-comment',
              'textBasic h-10 bg-[var(--color-main)] text-white hover:bg-[var(--color-sub)]',
            )}
            disabled={isSubmitting}
          >
            {isSubmitting ? '게시 중...' : '게시하기'}
          </Button>
        </div>
      </form>
    </>
  );
}
