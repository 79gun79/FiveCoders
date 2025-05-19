import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import IsLoggedInModal from '../components/IsLoggedInModal';
import { useModalStore } from '../stores/modalStore';
import IsLoggedOutModal from '../components/IsLoggedOutModal';
import Footer from '../components/Footer';

export default function Layout() {
  const { isLogInOpen, isLogOutOpen, isLogInModal, isLogOutModal } =
    useModalStore();
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="w-full">
          <div className="mx-auto mt-10 w-full">
            <Outlet />
            {isLogInOpen && (
              <IsLoggedInModal onClose={() => isLogInModal(false)} />
            )}
            {isLogOutOpen && (
              <IsLoggedOutModal onClose={() => isLogOutModal(false)} />
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
