import { useEffect, useRef, useState } from 'react';
import placeholderIcon from '../assets/channelImg.svg';
import sanitizeHtml from 'sanitize-html';
import { twMerge } from 'tailwind-merge';
import Button from './Button';
import { FaEllipsisV } from 'react-icons/fa';
import { BiSolidLike } from 'react-icons/bi';
import { AiFillMessage } from 'react-icons/ai';
import { useCommentStore } from '../stores/commentStore';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import IsLoggedInModal from './IsLoggedInModal';
import { deletePost } from '../utils/post';

export default function PostPage({ post }: { post: Post }) {
  const [liked, setLiked] = useState(false);
  const [isCmtForm, setCmtForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [showDrop, setShowDrop] = useState<boolean>(false); // 수정,삭제 메뉴 노출여부 상태관리
  const refDrop = useRef<HTMLDivElement>(null); // 수정,삭제 메뉴 클릭여부 상태관리

  const { comments, addComment, deleteComment } = useCommentStore();

  // 외부 클릭 시 드롭메뉴 닫기
  const handleClickOutside = (e: MouseEvent) => {
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

  const parseContent = (content: string) => {
    const [head, ...body] = content.split(/<p>/i);
    return {
      head: head.trim(),
      body: `<p>${body.join('<p>')}`,
    };
  };

  const cleanContent = (body: string) =>
    sanitizeHtml(body, {
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
          color: [/^red$/, /^blue$/, /^green$/, /^black$/, /^orange$/],
        },
      },
    });

  const { head, body } = parseContent(post.title);
  return (
    <>
      <div key={post._id} className="postShadow postBorder">
        <div className="postBottom pb-9">
          <div className="mb-4 flex items-center gap-[10px]">
            <img
              src={post.image || placeholderIcon}
              alt="profile"
              className="postProfile"
            />
            <p className="text-base">{post.author}</p>

            <div className="flex-grow"></div>
            <div className="relative" ref={refDrop}>
              <Button
                onClick={() => setShowDrop(!showDrop)}
                className={twMerge('btn-style-post', 'h-fit w-[37px]')}
              >
                <FaEllipsisV size={13} />
              </Button>

              {showDrop && (
                <div
                  className={twMerge(
                    'postBorder',
                    'absolute right-0 mt-2 w-20 overflow-hidden rounded-lg p-0',
                    'bg-white',
                  )}
                >
                  <Button
                    onClick={() => setIsOpen(true)}
                    className="btn-style-post2 text-black"
                  >
                    수정
                  </Button>
                  <Button
                    onClick={() => {
                      if (window.confirm('해당 게시글을 삭제하시겠습니까?')) {
                        deletePost(post._id);
                        alert('게시글이 삭제되었습니다.');
                      }
                    }}
                    className="btn-style-post2 text-[var(--color-red-caution)]"
                  >
                    삭제
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="textH4 font-bold">{head}</div>
          {post.image && (
            <img
              src={post.image}
              alt={post._id}
              className="mt-3 max-w-[564px] object-contain"
            />
          )}
          <div
            className="textT1 mt-3"
            dangerouslySetInnerHTML={{ __html: cleanContent(body) }}
          ></div>
        </div>

        <div className="postBottom flex items-center justify-around">
          <Button
            onClick={() => setLiked(!liked)}
            className={`btn-style-post ${
              liked ? 'text-[var(--color-main)]' : 'text-[var(--color-gray5)]'
            }`}
          >
            <BiSolidLike size={13} />
            <span>좋아요</span>
          </Button>
          <Button
            onClick={() => setCmtForm(!isCmtForm)}
            className={`btn-style-post ${
              isCmtForm
                ? 'text-[var(--color-main)]'
                : 'text-[var(--color-gray5)]'
            }`}
          >
            <AiFillMessage size={13} />
            <span>댓글 달기</span>
          </Button>
        </div>

        <div className="flex flex-col">
          {comments.map((v) => (
            <CommentList key={v.commentId} {...v} onDelete={deleteComment} />
          ))}
        </div>
        {isCmtForm && <CommentForm addComment={addComment} />}
        {isOpen && <IsLoggedInModal onClose={() => setIsOpen(false)} />}
      </div>
    </>
  );
}
