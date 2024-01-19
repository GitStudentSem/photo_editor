import { useState, DragEvent, RefObject } from "react";
import s from "./images.module.css";
import { INotification } from "../rotatePage/RotatePage";

interface IImagesListProps {
  imagesList: File[];
}
const ImagesList = ({ imagesList }: IImagesListProps) => {
  return imagesList.map((image) => {
    return (
      <img
        key={image.name}
        className={s.image}
        alt='Исходное изображение'
        src={URL.createObjectURL(image)}
      />
    );
  });
};

interface IImagesProps {
  originalImage: File[] | undefined;
  setOriginalImage: (file: File[] | undefined) => void;
  processedImage: File[] | undefined;
  setNotification: (notification: INotification) => void;
  filePickerRef: RefObject<HTMLInputElement>;
}
export const Images = ({
  originalImage,
  setOriginalImage,
  processedImage,
  setNotification,
  filePickerRef,
}: IImagesProps) => {
  const [isDrag, setIsDrag] = useState(false);

  const dragEnterHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDrag(true);
  };
  const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDrag(false);
  };
  const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const dropHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const dt = e.dataTransfer;
    const files = [...dt.files].filter((file: File) => {
      const regex = /image/;
      const isImage = regex.test(file.type);
      if (isImage) {
        return true;
      } else {
        setNotification({
          text: `Файл ${file.name} не был добавлен - это не изображение`,
        });
        return false;
      }
    });
    if (filePickerRef.current && filePickerRef.current?.files) {
      filePickerRef.current.files = dt.files; // Это костыль пока не готово получение массива
    }
    setOriginalImage(files);
    setIsDrag(false);
  };

  return (
    <div className={s.images_wrapper}>
      <div
        className={s.image_before}
        onDragEnter={dragEnterHandler}
        onDragLeave={dragLeaveHandler}
        onDrop={dropHandler}
        onDragOver={dragOverHandler}
      >
        {originalImage ? (
          <ImagesList imagesList={originalImage} />
        ) : isDrag ? (
          <p>Отпустите для загрузки</p>
        ) : (
          <p>Перетащите файлы сюда</p>
        )}
      </div>
      <div className={s.image_after}>
        {processedImage && <ImagesList imagesList={processedImage} />}
      </div>
    </div>
  );
};
