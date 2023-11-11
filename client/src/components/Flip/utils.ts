export const mapFileListToArray = (files: FileList) => {
  const array = [];
  for (let i = 0; i < files.length; i++) {
    array.push(files.item(i));
  }

  return array;
};
