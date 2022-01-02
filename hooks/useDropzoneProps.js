import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const useDropzoneProps = () => {
  const [fileData, setFileData] = useState(null);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = await acceptedFiles.map((file) => ({
        preview: URL.createObjectURL(file),
        file,
      }));

      setFileData(file[0]);
    },
    [setFileData]
  );

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      accept: [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/gif',
        'image/svg',
        'image/tiff',
      ],
      multiple: false,
      noClick: true,
      minSize: 0,
      maxSize: 5242880,
      onDrop,
    });

  return {
    data: fileData,
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
  };
};

export default useDropzoneProps;
