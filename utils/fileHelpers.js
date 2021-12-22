export const convertFilesizeToMbOrKb = (filesize) => {
  let size = '';
  if (filesize >= 1048576) {
    size = filesize / 1048576 + ' megabytes';
  } else if (filesize >= 1024) {
    size = filesize / 1024 + ' kilobytes';
  } else {
    size = filesize + ' bytes';
  }
  return size;
};

export const createFileFromUrl = async (url) => {
  const response = await fetch(url);
  const data = await response.blob();
  const metadata = { type: data.type };
  const filename = url.replace(/\?.+/, '').split('/').pop();
  return new File([data], filename, metadata);
};

export const readFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      resolve(e?.target?.result);
    };
    reader.onerror = (e) => {
      reader.abort();
      reject(e);
    };

    reader.readAsDataURL(file);
  });
};
