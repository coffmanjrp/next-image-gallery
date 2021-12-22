import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { getAuth } from 'firebase/auth';
import { app } from '@/firebase/config';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import { fileDataState } from '@/atoms/dataAtom';

const CreateGalleryItemModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fileName: '',
    username: '',
    isPublic: true,
    tag: '',
    tags: [],
  });
  const { fileName, username, isPublic, tag, tags } = formData;
  const modalRef = useRef();
  const [fileData, setFileData] = useRecoilState(fileDataState);
  const auth = getAuth(app);

  useEffect(() => {
    if (fileData) {
      setShowModal(true);
      setFormData({
        ...formData,
        fileName: fileData?.name,
        username: auth.currentUser?.displayName,
      });
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileData]);

  const handleClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleToggleButton = () => {
    setFormData((prevState) => ({
      ...formData,
      isPublic: !prevState.isPublic,
    }));
  };

  const removeTag = (index) => {
    setFormData({
      ...formData,
      tags: tags.filter((_, i) => i !== index),
    });
  };

  const handleClose = () => {
    setShowModal(false);
    setFormData({
      fileName: '',
      username: '',
      isPublic: true,
      tag: '',
      tags: [],
    });
  };

  return (
    <div className={`modal ${showModal ? 'modal-open' : ''}`}>
      <div
        ref={modalRef}
        className="modal-box relative flex flex-row max-w-full w-[calc(100vw-100px)] h-[calc(100vh-100px)]"
      >
        <button
          type="button"
          className="absolute top-4 right-5 w-[30px] h-[30px] z-10 pointer"
          onClick={handleClose}
        >
          <AiOutlineClose size="1.5rem" />
        </button>
        <div className="relative flex-1 w-[calc(100vw-600px)] ">
          <div className="flex justify-center items-center h-full overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            <img src={fileData?.base64} alt={fileData?.name} />
          </div>
        </div>
        <div className="divider divider-vertical"></div>
        <form className="w-[500px]">
          <div className="form-control h-full pt-[50px] pb-[20px] px-[40px]">
            <label className="label">
              <span className="label-text">File Name</span>
            </label>
            <div className="mb-4 pb-[5px] border-b-2 border-gray-400">
              <input
                type="text"
                id="fileName"
                className="w-full bg-transparent text-xl border-none focus:outline-none"
                value={fileName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="label">
                <span className="label-text">Owner Name</span>
              </label>
              <input
                type="text"
                id="username"
                className="input input-bordered w-full"
                placeholder="Type user name here"
                value={username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Show in public?</span>
              </label>
              <input
                type="checkbox"
                className="toggle"
                checked={isPublic}
                onClick={handleToggleButton}
              />
            </div>
            <div className="flex-1">
              <label className="relative label">
                <span className="label-text">Add tags</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="tag"
                  className="input input-bordered w-full pr-16"
                  placeholder="Type here to add a tag"
                  value={tag}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="btn btn-ghost absolute top-0 right-0 rounded-l-none"
                  onClick={() => {
                    if (tag !== '') {
                      setFormData({
                        ...formData,
                        tags: [...tags, tag],
                        tag: '',
                      });
                    }
                  }}
                >
                  <AiOutlinePlus size="1.5rem" />
                </button>
              </div>
              <div className="mt-6 flex flex-wrap gap-6">
                {tags.map((tag, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => removeTag(index)}
                  >
                    <div className="badge badge-error badge-outline badge-lg">
                      # {tag}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary uppercase">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGalleryItemModal;
