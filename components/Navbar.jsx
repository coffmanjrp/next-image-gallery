import Link from 'next/link';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaBars, FaGithub, FaRegBell } from 'react-icons/fa';

const Navbar = ({ title }) => {
  return (
    <div className="sticky top-0 navbar justify-between shadow-lg bg-neutral text-neutral-content">
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
      <button type="button" className="btn btn-square btn-ghost">
        <FaRegBell size="1.3rem" />
      </button>
      <a
        href="https://github.com/"
        target="_blank"
        rel="noopner noreferrer"
        className="btn btn-square btn-ghost"
      >
        <FaGithub size="1.3rem" />
      </a>
    </div>
  );
};

export default Navbar;
