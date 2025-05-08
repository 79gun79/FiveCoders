import { Route, Routes } from "react-router";
import MyPage from "./pages/MyPage";
import ProfileSetting from "./pages/ProfileSetting";

export default function router() {
  return (
    <Routes>
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/setting" element={<ProfileSetting />} />
    </Routes>
  );
}
