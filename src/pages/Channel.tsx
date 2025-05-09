import { twMerge } from "tailwind-merge";
import { postsData } from "../types/postsData";
import { FaPlus } from "react-icons/fa";
import { TiStarFullOutline } from "react-icons/ti";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { commentsData } from "../types/commentsData";
import PostList from "../components/PostList";
import Button from "../components/Button";
import fcOnline from "../assets/fcOnline.jpg";
import placeholderIcon from "../assets/channelImg.svg";

export default function Channel() {
  const [channelData, setChannelData] = useState<ChannelType>({
    authRequired: true,
    posts: postsData, // 채널의 게시글 모음
    channelId: 1,
    name: "FC 온라인",
    description: fcOnline,
    createdAt: "",
    updatedAt: "",
  }); // 채널자체를 상태 관리
  const [subscribes, setSubscribes] = useState(false); // 채널 구독 상태 관리

  const createPost = (newPost: string) => {
    const nextId = channelData.posts.length + 1;
    const newItem: PostType = {
      postId: nextId,
      image: placeholderIcon,
      coverImage: placeholderIcon,
      title: newPost,
      userName: "익명",
      comments: commentsData,
    };
    setChannelData((v) => ({ ...v, posts: [...v.posts, newItem] }));
  };

  const deletePost = (id: number) => {
    setChannelData((v) => ({
      ...v,
      posts: v.posts.filter((post) => post.postId !== id),
    }));
  };

  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate("create", { state: { createPost } });
  };
  return (
    <>
      <div className="flex flex-col min-w-[640px] mb-[50px]">
        <div className="justify-center items-center mb-[30px]">
          <div className={twMerge("postBottom", "h-[155px] border border-b-0")}>
            <img
              className="w-full h-full object-cover"
              src={channelData.description}
            />
          </div>
          <div
            className={twMerge(
              "postBottom",
              "h-[76px] flex items-center border px-[20px]"
            )}
          >
            <h3 className={twMerge("textH3", "font-bold")}>
              {channelData.name}
            </h3>
            <TiStarFullOutline
              onClick={() => setSubscribes(!subscribes)}
              className={twMerge(
                "ml-5 transition-colors hover:text-[var(--color-main)]",
                subscribes
                  ? "text-[var(--color-sub)]"
                  : "text-[var(--color-gray4)]"
              )}
              size={22}
            />
            <div className="flex-grow"></div>

            <Button
              onClick={handleCreatePost}
              className={twMerge(
                "btn-style",
                "textST1",
                "w-[91px] h-[36px] font-normal px-4 py-2"
              )}
            >
              <FaPlus className="text-white mr-1" size={12} />
              <span>글쓰기</span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-[30px]">
          {channelData.posts.map((v) => (
            <PostList key={v.postId} deletePost={deletePost} {...v} />
          ))}
        </div>
      </div>
    </>
  );
}
