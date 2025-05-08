import { Link } from "react-router";

export default function CancelBtn() {
  return (
    <>
      <Link to="/mypage">
        <button className="cancel text-T02">취소</button>
      </Link>
    </>
  );
}
