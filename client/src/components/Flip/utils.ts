interface flipI {
  flip: boolean | undefined;
  ref: React.RefObject<HTMLImageElement>;
}

export const getImageflipX = function ({ flip, ref }: flipI) {
  if (flip && ref.current) {
    ref.current.style.transform = "scaleX(-1) ";
  } else if (ref.current) {
    ref.current.style.transform = "scaleX(1) ";
  }
};
export const getImageflipY = function ({ flip, ref }: flipI) {
  if (flip && ref.current) {
    ref.current.style.transform = "scaleY(-1) ";
  } else if (ref.current) {
    ref.current.style.transform = "scaleY(1) ";
  }
};
