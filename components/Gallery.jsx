import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Masonry from 'react-masonry-css';
import { fileDataState } from '@/atoms/dataAtom';
import { GalleryItem, Spinner } from '@/components/index';
import { useDropzoneProps, useFirestore } from '@/hooks/index';

const Gallery = () => {
  const [fileData, setFileData] = useRecoilState(fileDataState);
  const { data, getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzoneProps();
  const [docs, loading, error] = useFirestore('images');
  const breakpoints = {
    default: 7,
    1024: 4,
    768: 3,
    640: 2,
  };

  useEffect(() => {
    if (data) setFileData(data);
  }, [data, fileData, setFileData]);

  if (loading) {
    return <Spinner />;
  }

  console.log(docs);

  return (
    <div
      {...getRootProps({
        className: `p-8 md:ml-16 w-[calc(100% - 4rem)] min-h-screen focus:outline-none border-2 ${
          isDragAccept
            ? 'border-secondary shadow-inner shadow-secondary'
            : 'border-transparent'
        } 
         ${isDragReject && 'border-error shadow-inner shadow-error'}
         `,
      })}
    >
      <input {...getInputProps()} />
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
