import { FaCaretDown } from "react-icons/fa";
import Button from "../components/Button";
import Input from "../components/Input";
import { useState } from "react";
import PostEditor from "../components/PostEditor";
import { twMerge } from "tailwind-merge";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const handleEditorChange = (value: string) => {
    setContent(value);
  };

  return (
    <>
      <div className="flex flex-col min-w-[656px] items-start justify-center gap-[26px] mb-[50px]">
        <h2 className="textH2">게시글 작성</h2>
        <Button className="btn-style-channelList mb-[34px]">
          <FaCaretDown className="mr-1" />
          <span className="textST1 text-[var(--color-gray7)]">
            커뮤니티를 선택하세요
          </span>
        </Button>
        <Input className="input-style-head" placeholder="제목을 입력하세요" />
        <PostEditor value={content} onChange={handleEditorChange} />
        <div className="w-full flex justify-end gap-4">
          <Button
            className={twMerge("btn-style-comment", "h-10 textBasic px-5")}
          >
            취소
          </Button>
          <Button
            className={twMerge(
              "btn-style-comment",
              "bg-[var(--color-main)] hover:bg-[var(--color-sub)] h-10 textBasic text-white"
            )}
          >
            게시하기
          </Button>
        </div>
      </div>
    </>
  );
}
