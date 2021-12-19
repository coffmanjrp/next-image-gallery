import { GalleryItem } from '@/components/index';
import { useFirestore } from '@/hooks/index';

const Gallery = () => {
  const [docs, loading, error] = useFirestore('images');

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="flex m-8 ml-32 w-full h-screen justify-beween items-start gap-5">
      {docs && docs.map((doc) => <GalleryItem key={doc.id} doc={doc} />)}
    </div>
  );
};

export default Gallery;
