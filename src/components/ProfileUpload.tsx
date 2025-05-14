import { useEffect, useRef, useState } from 'react';
import prof from '../assets/imgs/기본 프로필.png';
// import userData from '../data/UserData';
import axios from 'axios';
import { client } from '../services/axios';
import { useAuthStore } from '../stores/authStore';
import { CiImageOn } from 'react-icons/ci';

export default function ProfileUpload({
  userEmail,
  saveImage,
}: {
  userEmail: string;
  saveImage: boolean;
}) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [Image, setImage] = useState(prof);
  // const userEmail = userData((state) => state.userEmail);
  const fileInput = useRef<HTMLInputElement | null>(null);
  const userId = '68240ae628cdb13ab4a83053';

  const isChanged = async (e: React.ChangeEvent<any>) => {
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

    if (saveImage === true) {
      try {
        // axios.post(
        //   `${API_URL}users/upload-photo`,
        //   {
        //     formdata: formData,
        //   },
        //   {
        //     headers: {
        //       'Content-Type': 'multipary/form-data',
        //     },
        //   },
        // );
        await axios({
          method: 'post',
          url: `${API_URL}users/upload-photo`,
          data: formData,
          headers: {
            'Content-Type': 'multipary/form-data',
            // Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    client(`/users/${userId}`).then((response) =>
      setImage(response.data.image),
    );
  }, []);

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
