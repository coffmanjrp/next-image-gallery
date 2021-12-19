import Masonry from 'react-masonry-css';
import { GalleryItem, Spinner } from '@/components/index';
import { useFirestore } from '@/hooks/index';

const Gallery = () => {
  const [docs, loading, error] = useFirestore('images');
  const breakpoints = {
    default: 7,
    1024: 4,
    768: 3,
    640: 2,
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="m-8 ml-32 w-full h-screen">
      <Masonry
        breakpointCols={breakpoints}
        className="flex ml-[-0.375rem] w-auto"
        columnClassName="pl-3 bg-clip-padding"
      >
        {docs && docs.map((doc) => <GalleryItem key={doc.id} doc={doc} />)}
      </Masonry>
    </div>
  );
};

export default Gallery;
