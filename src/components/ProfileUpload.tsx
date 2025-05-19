import { useEffect, useRef, useState } from 'react';
import prof from '../assets/imgs/defaultProfileImg.png';
import { client } from '../services/axios';
import { CiImageOn } from 'react-icons/ci';
import { usePreviewImage } from '../stores/imageStore';

export default function ProfileUpload({
  userEmail,
  userData,
}: {
  userEmail: string;
  userData: string;
}) {
  const [Image, setImage] = useState<string | null>('');
  const fileInput = useRef<HTMLInputElement | null>(null);
  const setPreviewImage = usePreviewImage((state) => state.setPrevImage);

  const isChanged = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    formData.append('image', e.target.files![0] || prof);
    setPreviewImage(e.target.files![0]);
    let ImageURL: string | undefined = undefined;

    try {
      if (e.target.files && e.target.files.length > 0) {
        ImageURL = URL.createObjectURL(e.target.files[0]);
        setImage(ImageURL);
      } else {
        setImage(prof);
      }
      // 이미지 리더
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2 && typeof reader.result === 'string') {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files![0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userData) {
      client(`/users/${userData}`).then((response) =>
        setImage(response.data.image || prof),
      );
    }
  }, [userData]);

  return (
    <>
      <img
        src={Image || prof}
        alt="프로필"
        className="h-30 w-30 rounded-full"
      />
      <div className="ml-8.5">
        <span className="textT1 block text-[var(--color-gray7)]">이메일</span>
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
          className="textST1 cursor-pointer rounded-xl bg-[var(--color-gray1)] px-4 py-2.5 text-[var(--color-gray6)]"
        >
          <CiImageOn className="mr-1 inline-block h-[16px] w-[16px] align-middle text-[var(--color-gray6)]" />
          프로필 사진 변경
        </label>
      </div>
    </>
  );
}
