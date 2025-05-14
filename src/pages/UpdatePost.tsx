import { FaCaretDown } from 'react-icons/fa';
import Button from '../components/Button';
import { useEffect, useRef, useState } from 'react';
import PostEditor from '../components/PostEditor';
import { twMerge } from 'tailwind-merge';
import ChooseCommunity from '../components/ChooseCommunity';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { validateEmptyContent } from '../utils/validators';
import ReactQuill from 'react-quill-new';
import PostHeadInput from '../components/PostHeadInput';
import { updatePost } from '../services/postApi';
import { channelData } from '../data/channelData';
import { parseContent } from '../utils/parseContent';

export default function UpdatePost() {
  const navigate = useNavigate();
  const location = useLocation();
  const { post }: { post: Post } = location.state || {};
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [chooseList, setChooseList] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null); // 자식 컴포넌트에서 사용
  const contentRef = useRef<ReactQuill>(null); // 자식 컴포넌트에서 사용
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);

  const [cName, setCName] = useState('');
  const [cIcon, setCIcon] = useState('');
  const [cLink, setCLink] = useState('');
  const [cId, setCId] = useState('');

  useEffect(() => {
    const currentChannel = channelData.find((v) => v.channelId === id);

    if (currentChannel) {
      setCName(currentChannel.name);
      setCIcon(currentChannel.bannerImg);
      setCLink(currentChannel.channelId);
      setCId(currentChannel._id);

      const { head, body } = parseContent(post.title);
      setTitle(head);
      setContent(body);
    }
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

  const handleCancel = async () => {
    if (!validateEmptyContent(content) || title) {
      if (!window.confirm('수정을 그만하시겠습니까?')) return;
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

    if (!cLink) {
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
    if (!window.confirm('게시글을 수정하시겠습니까?')) return;

    try {
      await updatePost({
        postId: post._id,
        title: title + content,
        channelId: cId,
      });
      alert('게시글이 수정되었습니다.');
      navigate(`/channel/${cLink}`);
    } catch (err) {
      alert('게시글 수정에 실패했습니다. 다시 시도해주세요.');
      throw err;
    }
  };

  return (
    <>
      <form
        className="mb-[50px] flex min-w-[656px] flex-col items-start justify-center gap-[26px]"
        onSubmit={handleSubmit}
      >
        <h2 className="textH2">게시글 수정</h2>
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
              'textBasic h-10 bg-[var(--color-orange)] text-white hover:bg-[var(--color-deep-orange)]',
            )}
          >
            수정하기
          </Button>
        </div>
      </form>
    </>
  );
}
