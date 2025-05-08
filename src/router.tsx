import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Channel from "./pages/Channel";
import ChannelList from "./pages/ChannelList";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";

export default function Router() {
  return (
    <Routes>
      {/* 레이아웃 적용되지 않는 페이지 */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* 레이아웃 적용되는 페이지 그룹 */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/channel" element={<Channel />} />
        <Route path="/channellist" element={<ChannelList />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}