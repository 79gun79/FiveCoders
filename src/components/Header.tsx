import { useState } from 'react';
import Logo from '../assets/GammueLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import HeaderLogin from './HeaderLogin';
import HeaderNotLogin from './HeaderNotLogin';
import { useAuthStore } from '../stores/authStore';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { MdOutlineCancel } from 'react-icons/md';

export default function Header() {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  const searchNavigate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search?q=${searchInput}`);
  };

  return (
    <header className="z-10 flex items-center justify-center border-b border-[var(--color-gray4)] bg-white">
      <Link to={'/'} className="absolute left-8 cursor-pointer">
        <img src={Logo} alt="Logo" className="w-28 md:w-40" />
      </Link>
      <form
        className="relative my-4 flex w-[50%] max-w-140 items-center max-md:w-55 max-sm:w-20"
        onSubmit={searchNavigate}
      >
        <Link
          to={`/search?q=${searchInput}`}
          className="absolute left-4 cursor-pointer"
        >
          <FaMagnifyingGlass className="text-[var(--color-main)]" />
        </Link>
        <input
          type="text"
          className="w-full rounded-4xl border-2 border-[#51B8B2] bg-white px-10 py-2.5 focus:outline-1 focus:outline-[#51B8B2]"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        {searchInput && (
          <button
            type="button"
            className="absolute right-4 cursor-pointer"
            onClick={() => setSearchInput('')}
          >
            <MdOutlineCancel className="text-[20px] text-[var(--color-gray5)]" />
          </button>
        )}
      </form>
      {useAuthStore.getState().isLoggedIn ? (
        <HeaderLogin />
      ) : (
        <HeaderNotLogin />
      )}
    </header>
  );
}
