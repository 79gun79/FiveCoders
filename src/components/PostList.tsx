import { twMerge } from 'tailwind-merge';
import Button from './Button';
import CommentList from './CommentList';
import { FaEllipsisV } from 'react-icons/fa';
import { BiSolidLike } from 'react-icons/bi';
import { AiFillMessage } from 'react-icons/ai';
import { useEffect, useRef, useState } from 'react';
import CommentForm from './CommentForm';
import IsLoggedInModal from './IsLoggedInModal';
import sanitizeHtml from 'sanitize-html';
import { usePostStore } from '../stores/postStore';
import { useCommentStore } from '../stores/commentStore';

export default function PostList({
  postId,
  coverImage,
  content,
  userName,
}: PostType) {
  const [liked, setLiked] = useState(false); // 좋아요 상태관리
  const [isCmtForm, setCmtForm] = useState(false); // 댓글창 상태관리
  const [isOpen, setIsOpen] = useState(false); // 모달창 상태 관리

  const [showDrop, setShowDrop] = useState<boolean>(false); // 수정,삭제 메뉴 노출여부 상태관리
  const refDrop = useRef<HTMLDivElement>(null); // 수정,삭제 메뉴 클릭여부 상태관리

  const { deletePost } = usePostStore(); // 전역 게시글 관리에서 게시글 삭제 기능 가져오기
  const { comments, addComment, deleteComment } = useCommentStore();

  const handleClickOutside = (e: MouseEvent) => {
    // 바깥을 클릭하면 드랍메뉴 닫아짐
    if (
      refDrop.current &&
      e.target instanceof HTMLDivElement &&
      !refDrop.current.contains(e.target)
    ) {
      setShowDrop(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const cleanContent = sanitizeHtml(content, {
    allowedTags: ['p', 'strong', 'em', 'u', 's', 'a', 'img', 'span'],
    allowedAttributes: {
      strong: ['style'],
      em: ['style'],
      u: ['style'],
      s: ['style'],
      span: ['style'],
      a: ['href', 'target'],
      img: ['src', 'alt', 'width', 'height'],
    },
    allowedSchemes: ['http', 'https', 'data'],
    allowedStyles: {
      '*': {
        color: [/^red$/, /^blue$/, /^green$/, /^black$/, /^white$/],
      },
    },
  }); // 게시글 등록을 위해 태그 형태로 넘어오는 내용을 가공

  return (
    <>
      <div className="postBorder">
        <div className={twMerge('postBottom', 'pb-9')}>
          <div className="mb-4 flex items-center gap-[10px]">
            <img src={coverImage} alt="profile" className="postProfile" />
            <p className="text-base">{userName}</p>
            <div className="flex-grow"></div>
            <div className="relative" ref={refDrop}>
              <Button
                onClick={() => setShowDrop(!showDrop)}
                className={twMerge('btn-style-post', 'h-fit w-[37px]')}
              >
                <FaEllipsisV
                  className="text-[var(--color-text-black)]"
                  size={13}
                />
              </Button>

              {showDrop && (
                <div
                  className={twMerge(
                    'postBorder',
                    'absolute right-0 mt-2 w-20 overflow-hidden rounded-lg p-0',
                  )}
                >
                  <div className="flex flex-col">
                    <Button
                      onClick={() => setIsOpen(true)}
                      className={twMerge('btn-style-post2', 'text-black')}
                    >
                      수정
                    </Button>
                    <Button
                      onClick={() => deletePost(postId)}
                      className={twMerge(
                        'btn-style-post2',
                        'text-[var(--color-red-caution)]',
                      )}
                    >
                      삭제
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            className="textH4"
            dangerouslySetInnerHTML={{ __html: cleanContent }}
          ></div>
        </div>
        <div
          className={twMerge('postBottom', 'flex items-center justify-around')}
        >
          <Button
            onClick={() => setLiked(!liked)}
            className={twMerge(
              'btn-style-post',
              liked ? 'text-[var(--color-main)]' : 'text-[var(--color-gray5)]',
            )}
          >
            <BiSolidLike className="mr-1" size={13} />
            <span>좋아요</span>
          </Button>
          <Button
            onClick={() => setCmtForm(!isCmtForm)}
            className={twMerge(
              'btn-style-post',
              isCmtForm
                ? 'text-[var(--color-main)]'
                : 'text-[var(--color-gray5)]',
            )}
          >
            <AiFillMessage className="mr-1" size={13} />
            <span>댓글 달기</span>
          </Button>
        </div>
        {/* 아래는 댓글 컴포넌트를 불러옴 */}
        <div className="flex flex-col">
          {comments.map((v) => (
            <CommentList key={v.commentId} {...v} onDelete={deleteComment} />
          ))}
        </div>
        {isCmtForm && <CommentForm addComment={addComment} />}
      </div>
      {isOpen && <IsLoggedInModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
