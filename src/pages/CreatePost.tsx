import { FaCaretDown } from "react-icons/fa";
import Button from "../components/Button";
import Input from "../components/Input";
import { useState } from "react";
import PostEditor from "../components/PostEditor";
import { twMerge } from "tailwind-merge";
import ChooseCommunity from "../components/ChooseCommunity";
import { useNavigate } from "react-router";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [chooseList, setChooseList] = useState(false);
  const [channel, setChannel] = useState("");
  const [cIcon, setCIcon] = useState("");
  const navigate = useNavigate();

  const handleChannelChange = (c1: string, c2: string) => {
    setChannel(c1);
    setCIcon(c2);
    setChooseList(false);
  };

  const handleEditorChange = (value: string) => {
    setContent(value);
  };

  return (
    <>
      <form className="flex flex-col min-w-[656px] items-start justify-center gap-[26px] mb-[50px]">
        <h2 className="textH2">게시글 작성</h2>
        <div className="relative z-30">
          <Button
            onClick={() => setChooseList(!chooseList)}
            className={twMerge(
              "btn-style-channelList mb-[34px]",
              channel === "" ? "" : "justify-start p-4 gap-2"
            )}
          >
            {channel === "" ? (
              <>
                <FaCaretDown className="mr-1" />
                <span className="textST1 text-[var(--color-gray7)]">
                  커뮤니티를 선택하세요
                </span>
              </>
            ) : (
              <>
                <img
                  className={twMerge("postProfile", "w-[20px] h-[20px]")}
                  src={cIcon}
                  alt="icon"
                />
                <span className="textST1 text-[var(--color-text-black)]">
                  {channel}
                </span>
              </>
            )}
          </Button>
          {chooseList && <ChooseCommunity onChange={handleChannelChange} />}
        </div>
        <Input className="input-style-head" placeholder="제목을 입력하세요" />
        <PostEditor value={content} onChange={handleEditorChange} />

        <div className="w-full flex justify-end gap-4">
          <Button
            type="reset"
            onClick={() => navigate("..")}
            className={twMerge("btn-style-comment", "h-10 textBasic px-5")}
          >
            취소
          </Button>

          <Button
            type="submit"
            className={twMerge(
              "btn-style-comment",
              "bg-[var(--color-main)] hover:bg-[var(--color-sub)] h-10 textBasic text-white"
            )}
          >
            게시하기
          </Button>
        </div>
      </form>
    </>
  );
}
