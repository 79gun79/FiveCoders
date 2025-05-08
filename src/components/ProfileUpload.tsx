import { useRef, useState } from "react";
import prof from "../assets/imgs/기본 프로필.png";
import userData from "../store/UserData";

export default function ProfileUpload() {
  const [Image, setImage] = useState(prof);
  const userEmail = userData((state) => state.userEmail);
  const fileInput = useRef<HTMLInputElement | null>(null);

  const isChanged = (e: React.ChangeEvent<any>) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
    // 이미지 리더
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);

    const formData = new FormData();
    formData.append("image", e.target.files[0]);
  };

  return (
    <>
      <img src={Image} alt="프로필" className="h-30 w-30 rounded-full" />
      <div className="ml-8.5">
        <span className="block text-T01">이메일</span>
        <span className="mt-2.75 block text-T01">{userEmail}</span>
        <div className="h-3.75"></div>
        <input
          type="file"
          accept="image/*"
          id="profileImg"
          style={{ display: "none" }}
          ref={fileInput}
          onChange={isChanged}
        />
        <label
          htmlFor="profileImg"
          className="text-ST01 bg-[var(--color-gray1)] py-2.5 px-3 rounded-xl"
        >
          프로필 사진 변경
        </label>
      </div>
    </>
  );
}
