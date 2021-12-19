import Image from 'next/image';
import { FaHeart } from 'react-icons/fa';
import { useFirestore } from '@/hooks/index';

const Gallery = () => {
  const [docs, loading, error] = useFirestore('images');

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="flex m-8 ml-32 w-full h-screen justify-beween items-start gap-5">
      {docs !== null &&
        docs.map((doc) => (
          <div key={doc.id} className="card shadow max-w-sm">
            <figure className="relative w-full h-[200px]">
              <Image
                src={doc.url}
                alt="Sunset in the mountains"
                layout="fill"
                objectFit="cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                <span className="text-primary">Next + Tailwind</span>{' '}
                <FaHeart className="inline text-secondary" />
              </h2>
              <p>
                Next and Tailwind CSS are a match made in heaven, check out this
                article on how you can combine these two for your next app.
              </p>
              <div className="card-actions">
                <button className="btn btn-secondary">More info</button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Gallery;
