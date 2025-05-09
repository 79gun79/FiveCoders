import { twMerge } from 'tailwind-merge';
import userData from '../types/UserData';

export default function MyInfo() {
  const myPost = userData((state) => state.myPost);
  const myFollower = userData((state) => state.myFollower);
  const myFollowing = userData((state) => state.myFollowing);

  return (
    <>
      <div className="ml-[46px] inline-grid content-center">
        <div className="flex h-[79px] w-[288.38px] justify-center divide-x-[0.5px] divide-solid divide-[var(--color-gray5)] rounded-[8px] border-[0.5px] p-[7.11px] text-center">
          <div className="w-[121.09px] content-center justify-center">
            <div className="textT1 m-[-3px]">게시글</div>
            <div className={twMerge('number')}>{myPost}</div>
          </div>
          <div className="w-[121.09px] content-center justify-center">
            <div className="textT1 m-[-3px]">팔로워</div>
            <div className={twMerge('number')}>{myFollower}</div>
          </div>
          <div className="w-[121.09px] content-center justify-center">
            <div className="textT1 m-[-3px]">팔로잉</div>
            <div className={twMerge('number')}>{myFollowing}</div>
          </div>
        </div>
      </div>
    </>
  );
}
