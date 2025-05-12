import { useState } from 'react';
import Logo from '../assets/GammueLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import HeaderLogin from './HeaderLogin';
import HeaderNotLogin from './HeaderNotLogin';
import { useAuthStore } from '../stores/authStore';

export default function Header() {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  const searchNavigate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search?q=${searchInput}`);
  };

  return (
    <header className="flex items-center justify-center border-b border-[var(--color-gray4)] bg-white">
      <Link to={'/'} className="absolute left-8 cursor-pointer">
        <img src={Logo} alt="Logo" className="w-40" />
      </Link>
      <form
        className="relative my-4 flex w-[560px] items-center"
        onSubmit={searchNavigate}
      >
        <input
          type="text"
          className="w-full rounded-4xl border-2 border-[#51B8B2] bg-white px-4 py-2.5 focus:outline-1 focus:outline-[#51B8B2]"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Link
          to={`/search?q=${searchInput}`}
          className="absolute right-4 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            <path
              fill="#51B8B2"
              d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0s.41-1.08 0-1.49zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
            ></path>
          </svg>
        </Link>
        {searchInput && (
          <button
            type="button"
            className="absolute right-11 cursor-pointer"
            onClick={() => setSearchInput('')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={28}
              height={28}
              viewBox="0 0 24 24"
            >
              <path
                fill={'var(--color-gray5)'}
                d="M12 4c-4.419 0-8 3.582-8 8s3.581 8 8 8s8-3.582 8-8s-3.581-8-8-8m3.707 10.293a.999.999 0 1 1-1.414 1.414L12 13.414l-2.293 2.293a.997.997 0 0 1-1.414 0a1 1 0 0 1 0-1.414L10.586 12L8.293 9.707a.999.999 0 1 1 1.414-1.414L12 10.586l2.293-2.293a.999.999 0 1 1 1.414 1.414L13.414 12z"
              ></path>
            </svg>
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
