import { FaCaretDown } from 'react-icons/fa';
import Button from '../components/Button';
import Input from '../components/Input';
import { useState } from 'react';
import PostEditor from '../components/PostEditor';
import { twMerge } from 'tailwind-merge';
import ChooseCommunity from '../components/ChooseCommunity';
import { useNavigate } from 'react-router-dom';
import { usePostStore } from '../stores/postStore';

export default function CreatePost() {
  const [content, setContent] = useState('');
  const [chooseList, setChooseList] = useState(false);
  const [channel, setChannel] = useState('');
  const [cIcon, setCIcon] = useState('');
  const navigate = useNavigate();
  const { createPost } = usePostStore(); // 전역으로 관리되는 상태 가져오기

  const handleChannelChange = (c1: string, c2: string) => {
    setChannel(c1);
    setCIcon(c2);
    setChooseList(false);
  };

  const handleEditorChange = (value: string) => {
    setContent(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPost(content);
    navigate('..');
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
              channel === '' ? '' : 'justify-start gap-2 p-4',
            )}
          >
            {channel === '' ? (
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
                  {channel}
                </span>
              </>
            )}
          </Button>
          {chooseList && <ChooseCommunity onChange={handleChannelChange} />}
        </div>
        <Input className="input-style-head" placeholder="제목을 입력하세요" />
        <PostEditor value={content} onChange={handleEditorChange} />

        <div className="flex w-full justify-end gap-4">
          <Button
            type="reset"
            onClick={() => navigate('..')}
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
