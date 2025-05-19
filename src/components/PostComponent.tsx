import { useEffect, useRef, useState } from 'react';
import placeholderIcon from '../assets/channelImg.svg';
import { twMerge } from 'tailwind-merge';
import Button from './Button';
import { FaEllipsisV } from 'react-icons/fa';
import { BiSolidLike } from 'react-icons/bi';
import { AiFillMessage } from 'react-icons/ai';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { deletePost } from '../services/postApi';
import { useAuthStore } from '../stores/authStore';
import { parseContent } from '../utils/parseContent';
import { cleanContent } from '../utils/cleanContent';
import { Link } from 'react-router-dom';
import { customToast } from '../utils/customToast';
import { HiTrash } from 'react-icons/hi';
import { customConfirm } from '../utils/customConfirm';
import { stateLike } from '../utils/stateLike';
import { client } from '../services/axios';
import { User } from '../types/user';
import { useModalStore } from '../stores/modalStore';
import { Post } from '../types/post';

export default function PostComponent({
  id,
  post,
  userInfo,
}: {
  id: string;
  post: Post;
  userInfo?: User;
}) {
  const isLoggedIn = useAuthStore.getState().isLoggedIn; // 로그인 상태 확인
  const [isCmtForm, setCmtForm] = useState(false);
  const [showDrop, setShowDrop] = useState<boolean>(false); // 수정,삭제 메뉴 노출여부 상태관리
  const refDrop = useRef<HTMLDivElement>(null); // 수정,삭제 메뉴 클릭여부 상태관리
  const [isDeleted, setIsDeleted] = useState(false); // 삭제된 상태 관리
  const { isLiked, toggleLike, likes } = stateLike(post);
  const [userData, setUserData] = useState<User>();

  const [isDeleting, setIsDeleting] = useState(false); // 삭제 중복 방지
  const [isUpdating, setIsUpdating] = useState(false); // 수정 중복 방지
  // 로그인 상태 모달창 전역 관리
  const { isLogInModal } = useModalStore();

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
    client('/auth-user').then((response) => setUserData(response.data));
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDelete = async () => {
    if (isDeleting) return; // 이미 삭제중이면 중단
    setIsDeleting(true);

    const isConfirmed = await customConfirm('해당 게시글을 삭제하시겠습니까?');
    if (!isConfirmed) {
      setIsDeleting(false);
      return;
    }
    try {
      await deletePost(post._id);
      customToast(
        '게시물이 삭제 되었습니다!',
        'success',
        <HiTrash className="text-[var(--color-sub)]" size={24} />,
      );
      setIsDeleted(true);
    } catch (err) {
      customToast('게시글 삭제에 실패했습니다.', 'error');
      throw err;
    } finally {
      setIsDeleting(false);
    }
  };

  const { head, body } = parseContent(post.title);

  return (
    <>
      {!isDeleted && (
        <div id={id} key={post._id} className="postShadow postBorder">
          <div className="postBottom pb-9">
            <div className="mb-4 flex items-center gap-[10px]">
              <img
                src={post.author.image || placeholderIcon}
                alt="profile"
                className="postProfile"
              />
              <p className="text-base">
                {post.author.fullName || userInfo?.fullName}
              </p>

              <div className="flex-grow"></div>
              {isLoggedIn && userData?._id === post.author._id && (
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
                      {isLoggedIn ? (
                        <Link to={`./update`} state={{ post }}>
                          <Button
                            className="btn-style-post2 text-black"
                            onClick={() => setIsUpdating(true)}
                            disabled={isUpdating}
                          >
                            수정
                          </Button>
                        </Link>
                      ) : (
                        <Button
                          onClick={() => isLogInModal(true)}
                          className="btn-style-post2 text-black"
                        >
                          수정
                        </Button>
                      )}
                      <Button
                        onClick={() =>
                          isLoggedIn ? handleDelete() : isLogInModal(true)
                        }
                        disabled={isDeleting}
                        className="btn-style-post2 text-[var(--color-red-caution)]"
                      >
                        삭제
                      </Button>
                    </div>
                  )}
                </div>
              )}
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
              onClick={toggleLike}
              className={`btn-style-post ${
                isLiked
                  ? 'text-[var(--color-main)]'
                  : 'text-[var(--color-gray5)]'
              }`}
              disabled={!isLoggedIn}
            >
              <BiSolidLike className="mr-2" size={13} />
              <span>좋아요 {likes.length}</span>
            </Button>
            <Button
              onClick={() => setCmtForm(!isCmtForm)}
              className={`btn-style-post ${
                isCmtForm
                  ? 'text-[var(--color-main)]'
                  : 'text-[var(--color-gray5)]'
              }`}
              disabled={!isLoggedIn}
            >
              <AiFillMessage className="mr-2" size={13} />
              <span>댓글 달기</span>
            </Button>
          </div>

          <div className="flex flex-col">
            {post.comments.map((v) => (
              <CommentList
                key={v._id}
                commentId={v._id}
                authorId={v.author._id}
                authorName={v.author.fullName || '(알 수 없음)'}
                userId={userData?._id || ''}
                comment={v.comment}
                profileImg={v.author.image}
              />
            ))}
          </div>
          {isCmtForm && userData && (
            <CommentForm postId={post._id} user={userData} />
          )}
        </div>
      )}
    </>
  );
}
