import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Search from './pages/Search';
import Home from './pages/Home';
import Channel from './pages/Channel';
import ChannelList from './pages/ChannelList';
import Content from './pages/Content';
import MyPage from './pages/MyPage';
import ProfileSetting from './pages/ProfileSetting';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';

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
        <Route path="/content/*" element={<Content />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/setting" element={<ProfileSetting />} />
        <Route path="/search" element={<Search />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
