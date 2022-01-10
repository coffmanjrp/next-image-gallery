import Image from 'next/image';

const GalleryItem = ({ doc }) => {
  return (
    <figure className="relative flex flex-col justify-center align-center mb-2.5 hover:cursor-pointer z-0">
      <img
        src={doc.url}
        alt={doc.title}
        className="non-draggable border-2 border-secondary hover:border-primary hover:shadow-lg hover:scale-105 rounded transition-all duration-300 ease-in-out"
      />
    </figure>
  );
};

export default GalleryItem;
