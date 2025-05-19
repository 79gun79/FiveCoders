import { twMerge } from 'tailwind-merge';

export default function MyInfo({
  myPost,
  myFollowing,
}: {
  myPost: number;
  myFollowing: number;
}) {
  return (
    <>
      <div className="ml-[46px] inline-grid content-center">
        <div className="flex h-[75px] w-[280px] justify-center divide-x-[0.5px] divide-solid divide-[var(--color-gray3)] p-[7.11px] text-center">
          <div className="w-[120px] content-center justify-center">
            <div className="textT1 m-[-3px] text-[var(--color-gray7)]">
              게시글
            </div>
            <div className={twMerge('number', 'text-[var(--color-main)]')}>
              {myPost}
            </div>
          </div>
          <div className="w-[120px] content-center justify-center">
            <div className="textT1 m-[-3px] text-[var(--color-gray7)]">
              구독한 채널
            </div>
            <div className={twMerge('number', 'text-[var(--color-main)]')}>
              {myFollowing}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
