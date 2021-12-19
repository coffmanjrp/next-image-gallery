import Image from 'next/image';

const GalleryItem = ({ doc }) => {
  return (
    <figure className="relative aspect-w-16 aspect-h-9 mb-2.5 border-2 border-secondary hover:border-primary rounded">
      <Image
        src={doc.url}
        alt="Sunset in the mountains"
        layout="fill"
        objectFit="cover"
        priority={true}
      />
    </figure>
  );
};

export default GalleryItem;
