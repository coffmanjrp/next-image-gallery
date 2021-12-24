import { useState, useEffect } from 'react';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const useAddFileToStorage = (file, name) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUrl = async () => {
      const storeUrl = await storeFile(file?.file);

      setLoading(false);
      setUrl(storeUrl);
    };

    getUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

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
          setProgress(progress);

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
          setError(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  return { progress, url, loading, error };
};

export default useAddFileToStorage;
