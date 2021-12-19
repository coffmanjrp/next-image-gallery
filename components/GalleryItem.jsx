import Image from 'next/image';

const GalleryItem = ({ doc }) => {
  return (
    <div key={doc.id} className="card shadow max-w-sm w-96">
      <figure className="relative aspect-w-16 aspect-h-9">
        <Image
          src={doc.url}
          alt="Sunset in the mountains"
          layout="fill"
          objectFit="cover"
          priority={true}
        />
      </figure>
    </div>
  );
};

export default GalleryItem;
