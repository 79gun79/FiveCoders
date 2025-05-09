import { twMerge } from "tailwind-merge";
import Button from "./Button";
import { useNavigate } from "react-router";

export default function IsLoggedInModal({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const handleConfirm = () => {
    navigate("/login");
  };
  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black opacity-50 z-40"
      ></div>

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white text-center w-[400px] p-8 shadow-lg">
          <p className="text-[18px] font-medium">
            로그인이 필요한 서비스입니다
          </p>
          <p className="text-[18px] font-medium mb-[32px]">
            로그인 하시겠습니까?
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={onClose}
              className={twMerge(
                "btn-style-modal",
                "bg-white hover:bg-[var(--color-gray1)] text-[var(--color-text-black)] border border-[var(--color-gray4)]"
              )}
            >
              아니오
            </Button>
            <Button className="btn-style-modal" onClick={handleConfirm}>
              예
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
