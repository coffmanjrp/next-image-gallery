import {
  Gallery,
  Layout,
  CreateGalleryItemModal,
  Sidebar,
} from '@/components/index';

const Home = () => {
  return (
    <>
      <Layout>
        <Sidebar />
        <Gallery />
      </Layout>
      <CreateGalleryItemModal />
    </>
  );
};

export default Home;
