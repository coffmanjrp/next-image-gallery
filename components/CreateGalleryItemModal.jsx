import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app, db } from '@/firebase/config';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import { fileDataState } from '@/atoms/dataAtom';
import { showModalState } from '@/atoms/uiAtom';
import { useDropzoneProps } from '@/hooks/index';

import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

const CreateGalleryItemModal = () => {
  const [formData, setFormData] = useState({
    file: null,
    name: '',
    username: '',
    isPublic: true,
    tag: '',
    tags: [],
  });
  const { file, name, username, isPublic, tag, tags } = formData;
  const modalRef = useRef();
  const [fileData, setFileData] = useRecoilState(fileDataState);
  const [showModal, setShowModal] = useRecoilState(showModalState);
  const auth = getAuth(app);
  const { data, getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzoneProps();

  useEffect(() => {
    if (data) setFileData(data);

    if (fileData) {
      setShowModal(true);
      setFormData({
        ...formData,
        file: fileData,
        name: fileData.file.name.replace(/\.[^/.]+$/, ''),
        username: auth.currentUser?.displayName,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, fileData, setFileData]);

  const handleChange = (e) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        file: e.target.file,
      });
    }

    if (e.target.type === 'text') {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }

    if (e.target.id === 'isPublic') {
      setFormData({
        ...formData,
        isPublic: !isPublic,
      });
    }
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
      file: null,
      name: '',
      username: '',
      isPublic: true,
      tag: '',
      tags: [],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storeFile = async (file) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${name}-${uuidv4()}`;
        const storageRef = ref(storage, `images/${filename}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const url = await storeFile(formData.file.file);

    const newFormData = {
      ...formData,
      url,
      createdAt: serverTimestamp(),
    };
    delete newFormData.file;
    delete newFormData.tag;

    console.log(newFormData);

    await setDoc(doc(db, 'images', auth.currentUser?.uid), newFormData);

    toast.success('Successfully uploaded');
    handleClose();
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
        <div
          {...getRootProps({
            className: `relative flex-1 w-[calc(100vw-600px)] focus:outline-none border-2 ${
              isDragAccept
                ? 'border-secondary shadow-inner shadow-secondary'
                : 'border-transparent'
            } 
         ${isDragReject && 'border-error shadow-inner shadow-error'}
         `,
          })}
        >
          <input {...getInputProps()} />
          <div className="flex justify-center items-center h-full overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            {file ? (
              <img src={file.base64} alt={name} />
            ) : (
              <p className="text-lg">Drop file here!</p>
            )}
          </div>
        </div>
        <div className="divider divider-vertical"></div>
        <form className="w-[500px]" onSubmit={handleSubmit}>
          <div className="form-control h-full pt-[50px] pb-[20px] px-[40px]">
            <label className="label">
              <span className="label-text">File Name</span>
            </label>
            <div className="mb-4 pb-[5px] border-b-2 border-gray-400">
              <input
                type="text"
                id="name"
                className="w-full bg-transparent text-xl border-none focus:outline-none"
                value={name}
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
                id="isPublic"
                className="toggle"
                checked={isPublic}
                onChange={handleChange}
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
                    <div className="badge badge-outline badge-lg"># {tag}</div>
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
