import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import Masonry from 'react-masonry-css';
import { useDropzone } from 'react-dropzone';
import { fileDataState } from '@/atoms/dataAtom';
import { GalleryItem, Spinner } from '@/components/index';
import { useFirestore } from '@/hooks/index';
import { readFile } from '@/utils/fileHelpers';

const Gallery = () => {
  const [fileData, setFileData] = useRecoilState(fileDataState);
  const [docs, loading, error] = useFirestore('images');
  const breakpoints = {
    default: 7,
    1024: 4,
    768: 3,
    640: 2,
  };

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const data = await readFile(acceptedFiles[0]);

      const file = await acceptedFiles.map((file) => ({
        base64: data,
        path: file.path,
        name: file.name.replace(/\.[^/.]+$/, ''),
        size: file.size,
        type: file.type,
        preview: URL.createObjectURL(file),
      }));

      setFileData(file[0]);
    },
    [setFileData]
  );

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      accept: 'image/*',
      multiple: false,
      noClick: true,
      minSize: 0,
      maxSize: 5242880,
      onDrop,
    });

  if (loading) {
    return <Spinner />;
  }

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
        className=" flex ml-[-0.375rem] w-auto"
        columnClassName="pl-3 bg-clip-padding"
      >
        {docs && docs.map((doc) => <GalleryItem key={doc.id} doc={doc} />)}
      </Masonry>
    </div>
  );
};

export default Gallery;
