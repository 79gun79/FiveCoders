import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Channel from "./pages/Channel";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Search from "./pages/Search";

//post는 퍼블리싱용 게시판 글 라우트 주소입니다.

export default function router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/channel" element={<Channel />} />
      <Route path="/post" element={<Post />} />
      <Route path="/search" element={<Search />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
