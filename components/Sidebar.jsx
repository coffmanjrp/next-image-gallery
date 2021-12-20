import { BsCloudUpload } from 'react-icons/bs';
import { AiOutlineEye } from 'react-icons/ai';
import { RiHashtag } from 'react-icons/ri';

const Sidebar = () => {
  return (
    <div className="fixed top-16 left-0 w-16' h-screen rounded-box shadow-lg overflow-hidden hidden md:block z-10">
      <ul className="menu mt-2">
        <li>
          <a className="hover:text-secondary">
            <RiHashtag size="1.5rem" />{' '}
          </a>
        </li>
        <li>
          <a className="hover:text-secondary">
            <BsCloudUpload size="1.5rem" />{' '}
          </a>
        </li>
        <li>
          <a className="hover:text-secondary">
            <AiOutlineEye size="1.5rem" />{' '}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
