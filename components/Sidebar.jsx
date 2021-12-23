import { useRecoilState } from 'recoil';
import { BsCloudUpload } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';
import { RiHashtag } from 'react-icons/ri';
import { showModalState } from '@/atoms/uiAtom';

const Sidebar = () => {
  const [showModal, setShowModal] = useRecoilState(showModalState);

  return (
    <div className="fixed top-16 left-0 w-16' h-screen rounded-box shadow-lg overflow-hidden hidden md:block z-10">
      <ul className="menu mt-2">
        <li>
          <a className="hover:text-secondary">
            <RiHashtag size="1.5rem" />{' '}
          </a>
        </li>
        <li>
          <a
            className="hover:text-secondary"
            onClick={() => setShowModal((prevState) => !prevState)}
          >
            <BsCloudUpload size="1.5rem" />{' '}
          </a>
        </li>
        <li>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopner noreferrer"
            className="hover:text-secondary"
          >
            <FaGithub size="1.5rem" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
