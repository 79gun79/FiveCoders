import { FaCaretDown } from 'react-icons/fa';
import Button from '../components/Button';
import { useEffect, useRef, useState } from 'react';
import PostEditor from '../components/PostEditor';
import { twMerge } from 'tailwind-merge';
import ChooseCommunity from '../components/ChooseCommunity';
import { useNavigate, useParams } from 'react-router-dom';
import { usePostStore } from '../stores/postStore';
import { dummyChannels } from '../data/dummyChannels';
import { validateEmptyContent } from '../utils/validators';
import ReactQuill from 'react-quill-new';
import PostHeadInput from '../components/PostHeadInput';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [chooseList, setChooseList] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null); // 자식 컴포넌트에서 사용
  const contentRef = useRef<ReactQuill>(null); // 자식 컴포넌트에서 사용
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);

  const [cName, setCName] = useState('');
  const [cIcon, setCIcon] = useState('');
  const [cId, setCId] = useState<string | null>(null);

  const navigate = useNavigate();
  const { createPost } = usePostStore(); // 전역으로 관리되는 상태 가져오기
  const { id } = useParams();

  useEffect(() => {
    const currentChannel = dummyChannels.find((v) => v._id === id);
    if (currentChannel) {
      setCName(currentChannel.name);
      setCIcon(currentChannel.imageUrl);
      setCId(currentChannel._id);
    }
  }, [id]);

  const handleChannelChange = (
    channelName: string,
    channelIcon: string,
    channelId: string,
  ) => {
    setCName(channelName);
    setCIcon(channelIcon);
    setChooseList(false);
    setCId(channelId);
  };

  const handleEditorChange = (value: string) => {
    setContent(value);
    if (!validateEmptyContent(value)) setContentError(false);
  };

  const handleCancel = async () => {
    if (!validateEmptyContent(content) || title) {
      if (
        !window.confirm('작성 중인 내용이 있습니다. 작성을 그만하시겠습니까?')
      )
        return;
    }
    try {
      await navigate(`/channel/${id}`);
    } catch {
      alert('동작 중에 오류가 발생했습니다. 다시 시도 해주세요!');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasError = false;

    if (!cId) {
      alert('채널을 선택해주세요!');
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

    if (hasError) return;
    if (!window.confirm('게시글을 등록하시겠습니까?')) return;

    try {
      await createPost(cId as string, title + content);
      alert('게시글이 등록 되었습니다.');
      navigate(`/channel/${cId}`);
    } catch {
      alert('게시글이 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <form
        className="mb-[50px] flex min-w-[656px] flex-col items-start justify-center gap-[26px]"
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
        />
        {contentError && <p className="cautionMsg">내용을 입력해주세요.</p>}

        <div className="flex w-full justify-end gap-4">
          <Button
            type="reset"
            onClick={handleCancel}
            className={twMerge('btn-style-comment', 'textBasic h-10 px-5')}
          >
            취소
          </Button>

          <Button
            type="submit"
            className={twMerge(
              'btn-style-comment',
              'textBasic h-10 bg-[var(--color-main)] text-white hover:bg-[var(--color-sub)]',
            )}
          >
            게시하기
          </Button>
        </div>
      </form>
    </>
  );
}
