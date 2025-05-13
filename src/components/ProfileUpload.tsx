import { useRef, useState } from 'react';
import prof from '../assets/imgs/기본 프로필.png';

export default function ProfileUpload({ userEmail }: { userEmail: string }) {
  const [Image, setImage] = useState(prof);
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
    formData.append('image', e.target.files[0]);
  };

  return (
    <>
      <img src={Image} alt="프로필" className="h-30 w-30 rounded-full" />
      <div className="ml-8.5">
        <span className="textT1 block">이메일</span>
        <span className="textT1 mt-2.75 block">{userEmail}</span>
        <div className="h-3.75"></div>
        <input
          type="file"
          accept="image/*"
          id="profileImg"
          style={{ display: 'none' }}
          ref={fileInput}
          onChange={isChanged}
        />
        <label
          htmlFor="profileImg"
          className="textST1 cursor-pointer rounded-xl bg-[var(--color-gray1)] px-3 py-2.5"
        >
          프로필 사진 변경
        </label>
      </div>
    </>
  );
}
