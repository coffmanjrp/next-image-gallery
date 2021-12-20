import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import { BsPalette2 } from 'react-icons/bs';
import { getAuth } from 'firebase/auth';
import { app } from '@/firebase/config';
import { ThemeMenu } from '@/components/index';

const Navbar = ({ title }) => {
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const themeMenuRef = useRef();
  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (themeMenuRef.current && !themeMenuRef.current.contains(e.target)) {
      setShowThemeMenu(false);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    router.push('/sign-in');
  };

  return (
    <div className="sticky top-0 navbar justify-between shadow-lg bg-neutral text-neutral-content z-20">
      <button type="button" className="btn btn-square btn-ghost md:hidden">
        <FaBars size="1.3rem" />
      </button>
      <div className="hidden px-2 mx-2 lg:flex">
        <Link href="/">
          <a>
            <span className="text-lg font-bold">{title}</span>
          </a>
        </Link>
      </div>
      {auth.currentUser && (
        <div className="flex-1 mx-2 md:mx-6">
          <div className="form-control flex-row w-full">
            <input
              type="text"
              placeholder="Search"
              className="input input-ghost w-full"
            />
            <button
              type="submit"
              className="btn btn-square btn-ghost hidden md:flex"
            >
              <AiOutlineSearch size="1.5rem" />
            </button>
          </div>
        </div>
      )}
      <div ref={themeMenuRef} className="relative">
        <button
          type="button"
          className="btn btn-square btn-ghost"
          onClick={() => setShowThemeMenu((prevState) => !prevState)}
        >
          <BsPalette2 size="1.3rem" />
        </button>
        <ThemeMenu {...{ showThemeMenu, setShowThemeMenu }} />
      </div>
      {auth.currentUser && (
        <button className="btn btn-square btn-ghost" onClick={handleLogout}>
          <div className="avatar placeholder">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-10 h-10">
              <span>
                {auth.currentUser &&
                  auth.currentUser.displayName.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </button>
      )}
    </div>
  );
};

export default Navbar;
