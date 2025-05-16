import { useEffect, useRef, useState } from 'react';
import prof from '../assets/imgs/기본 프로필.png';
import { client } from '../services/axios';
import { CiImageOn } from 'react-icons/ci';
// import { useAuthStore } from '../stores/authStore';
// import axios from 'axios';
import { usePreviewImage } from '../stores/imageStore';

export default function ProfileUpload({
  userEmail,
  // changedImage,
  userData,
}: {
  userEmail: string;
  // changedImage: (imageFile: File | undefined) => void;
  userData: [];
}) {
  // const [Image, setImage] = useState<File | undefined>();
  const [Image, setImage] = useState<string>('');
  const fileInput = useRef<HTMLInputElement | null>(null);
  // const API_URL = import.meta.env.VITE_API_URL;
  // const token = useAuthStore.getState().accessToken;
  const setPreviewImage = usePreviewImage((state) => state.setPrevImage);

  const isChanged = async (e: React.ChangeEvent<any>) => {
    const formData = new FormData();
    // console.log('saveImage"', saveImage);
    formData.append('image', e.target.files[0] || prof);
    setPreviewImage(e.target.files[0]);
    // console.log(...formData);
    // try {

    //   await axios({
    //     method: 'post',
    //     url: `${API_URL}users/upload-photo`,
    //     data: formData,
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    // } catch (error) {
    //   console.log(error);
    // }

    try {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
      } else {
        setImage(prof);
      }
      // 이미지 리더
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (Image instanceof File || Image === undefined) {
  //     changedImage(Image);
  //   }
  // }, [Image, changedImage]);

  useEffect(() => {
    if (userData.length !== 0) {
      client(`/users/${userData}`).then((response) =>
        setImage(response.data.image || prof),
      );
    }
  }, [userData]);

  return (
    <>
      <img src={Image} alt="프로필" className="h-30 w-30 rounded-full" />
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
