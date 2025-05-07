import { twMerge } from "tailwind-merge";
import Button from "./Button";
import CommentList from "./CommentList";
import { FaEllipsisV } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import { AiFillMessage } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import CommentForm from "./CommentForm";

export default function PostList({
  coverImage,
  title,
  userName,
  comments,
}: PostType) {
  const [liked, setLiked] = useState(false); // 좋아요 상태관리
  const [isCmtForm, setCmtForm] = useState(false);

  const [showDrop, setShowDrop] = useState<boolean>(false); // 수정,삭제 메뉴 노출여부 상태관리
  const refDrop = useRef<HTMLDivElement>(null); // 수정,삭제 메뉴 클릭여부 상태관리

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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []); // 외부 버튼을 눌러도 꺼지게끔 구성

  const [cmts, setCmts] = useState<CommentType[]>(comments);

  const addComment = (newComment: string) => {
    const nextId = comments.length + 1;
    const newItem: CommentType = {
      commentId: nextId,
      comment: newComment,
      coverImage:
        "https://cdn.pixabay.com/photo/2025/03/20/21/00/vulture-9483838_1280.jpg",
      userName: "익명",
    };

    setCmts([...cmts, newItem]);
  };

  return (
    <>
      <div className="postBorder">
        <div className={twMerge("postBottom", "pb-9")}>
          <div className="flex items-center gap-[10px] mb-4">
            <img src={coverImage} alt="profile" className="postProfile" />
            <p className="text-base">{userName}</p>
            <div className="flex-grow"></div>
            <div className="relative" ref={refDrop}>
              <Button
                onClick={() => setShowDrop(!showDrop)}
                className={twMerge("btn-style-post", "w-[37px] h-fit")}
              >
                <FaEllipsisV className="text-[var(--color-black)]" size={13} />
              </Button>

              {showDrop && (
                <div
                  className={twMerge(
                    "postBorder",
                    "absolute right-0 mt-2 w-20 p-0 rounded-lg overflow-hidden"
                  )}
                >
                  <div className="flex flex-col">
                    <Button
                      className={twMerge("btn-style-post2", "text-black")}
                    >
                      수정
                    </Button>
                    <Button
                      className={twMerge(
                        "btn-style-post2",
                        "text-[var(--color-red-caution)]"
                      )}
                    >
                      삭제
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <h4 className="textH4 pretendard">{title}</h4>
        </div>
        <div
          className={twMerge("postBottom", "flex items-center justify-around")}
        >
          <Button
            onClick={() => setLiked(!liked)}
            className={twMerge(
              "btn-style-post",
              liked ? "text-[var(--color-main)]" : "text-[#929292]"
            )}
          >
            <BiSolidLike className="mr-1" size={13} />
            <span>좋아요</span>
          </Button>
          <Button
            onClick={() => setCmtForm(!isCmtForm)}
            className={twMerge(
              "btn-style-post",
              isCmtForm ? "text-[var(--color-main)]" : "text-[#929292]"
            )}
          >
            <AiFillMessage className="mr-1" size={13} />
            <span>댓글 달기</span>
          </Button>
        </div>
        {/* 아래는 댓글 컴포넌트를 불러옴 */}
        <div className="flex flex-col">
          {cmts.map((v) => (
            <CommentList key={v.commentId} {...v} />
          ))}
        </div>
        {isCmtForm && <CommentForm addComment={addComment} />}
      </div>
    </>
  );
}
