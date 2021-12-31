import Image from 'next/image';

const GalleryItem = ({ doc }) => {
  return (
    // <figure className="relative aspect-w-16 aspect-h-9 mb-2.5 border-2 border-secondary hover:border-primary rounded z-0">
    <figure className="relative flex flex-col justify-center align-center mb-2.5 hover:cursor-pointer z-0">
      {/* <Image
        src={doc.url}
        alt={doc.title}
        layout="fill"
        objectFit="cover"
        priority={true}
      /> */}
      <img
        src={doc.url}
        alt={doc.title}
        className="non-draggable border-2 border-secondary hover:border-primary hover:shadow-lg hover:scale-105 rounded transition-all duration-300 ease-in-out"
      />
      <figcaption className="text-center text-base-content">
        {doc.title.slice(0, 20)}
        {doc.title.length > 20 && '...'}
      </figcaption>
    </figure>
  );
};

export default GalleryItem;
