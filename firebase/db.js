import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import {
  getFirestore,
  addDoc,
  setDoc,
  doc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { app } from './config';

export const db = getFirestore(app);
export const auth = getAuth(app);

export const createUser = async (data) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );
  const user = userCredential.user;

  updateProfile(auth.currentUser, {
    displayName: data.name,
  });

  const newData = { ...data };
  delete newData.password;
  newData.createdAt = serverTimestamp();

  await setDoc(doc(db, 'users', user.uid), newData);
};

export const createItem = async (data, file, title) => {
  const url = await storeFile(file, title);

  const { uid } = auth.currentUser;
  const newData = {
    ...data,
    url,
    userId: uid,
    createdAt: serverTimestamp(),
  };
  delete newData.file;
  delete newData.tag;

  await addDoc(collection(db, 'images'), newData);
};

export const storeFile = async (file, title) => {
  return new Promise((resolve, reject) => {
    const storage = getStorage();
    const filename = `${title}-${uuidv4()}`;
    const storageRef = ref(storage, `images/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        console.log(`Upload is ${progress}% done`);
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
