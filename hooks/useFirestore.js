import { useEffect, useState } from 'react';
import {
  getDocs,
  collection,
  query,
  where,
  limit,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/firebase/config';

const useFirestore = (name, option) => {
  const [docs, setDocs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const whereOpt = option?.where
    ? where(option.where[0], option.where[1], option.where[2])
    : where('createdAt', 'not-in', [0]);
  const orderByOpt = option?.orderBy
    ? orderBy(option.orderBy[0], option.orderBy[1])
    : orderBy('createdAt', 'desc');
  const limitOpt = option?.limit ? limit(option.limit) : limit(10);

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, option]);

  const fetchData = async () => {
    try {
      const docRef = collection(db, name);
      const q = query(docRef, whereOpt, orderByOpt, limitOpt);
      const docSnapshot = await getDocs(q);
      const newDocs = [];

      docSnapshot.forEach((doc) => {
        return newDocs.push({ id: doc.id, ...doc.data() });
      });

      setDocs(newDocs);
      setLoading(false);
    } catch (error) {
      console.error('erorr!', error);
      setError('Cloud not fetch data');
    }
  };

  return [docs, loading, error];
};

export default useFirestore;
