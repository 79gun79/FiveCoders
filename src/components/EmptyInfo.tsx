export default function EmptyInfo({ info }: { info: string }) {
  return (
    <>
      <div className="flex h-[300px] items-center justify-center">
        <div className="text-[18px] font-medium text-[var(--color-gray4)]">
          작성된 {info}이 없습니다.
        </div>
      </div>
    </>
  );
}
