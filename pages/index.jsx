import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuth } from 'firebase/auth';
import { app } from '@/firebase/config';
import { Gallery, Layout, Sidebar } from '@/components/index';

const Home = () => {
  const router = useRouter();
  const auth = getAuth(app);

  // TODO: Fix later to check user auth
  useEffect(() => {
    if (!auth.currentUser) {
      router.push('/sign-in');
    }
  }, []);

  return (
    <Layout>
      <div className="flex">
        <Sidebar />
        <Gallery />
      </div>
    </Layout>
  );
};

export default Home;
