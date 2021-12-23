import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { readFile } from '@/utils/fileHelpers';

const useDropzoneProps = () => {
  const [fileData, setFileData] = useState(null);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const data = await readFile(acceptedFiles[0]);

      const file = await acceptedFiles.map((file) => ({
        base64: data,
        file,
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

  return {
    data: fileData,
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
  };
};

export default useDropzoneProps;
