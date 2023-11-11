// interface flipI {
//   flipX: boolean | undefined;
//   refImage: React.RefObject<HTMLImageElement>;
// }

// export const getImageflipX = function ({ flipX, refImage }: flipI) {
//   if (flipX && refImage.current) {
//     refImage.current.style.transform = "scaleX(-1) ";
//   } else if (refImage.current) {
//     refImage.current.style.transform = "scaleX(1) ";
//   }
// };

// export const getImageflipY = function ({ flip, ref }: flipI) {
//   if (flip && ref.current) {
//     ref.current.style.transform = "scaleY(-1) ";
//   } else if (ref.current) {
//     ref.current.style.transform = "scaleY(1) ";
//   }
// };

export const mapFileListToArray = (files: FileList) => {
  const array = [];
  for (let i = 0; i < files.length; i++) {
    array.push(files.item(i));
  }

  return array;
};
