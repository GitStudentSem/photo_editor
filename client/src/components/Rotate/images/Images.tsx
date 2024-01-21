import { useState, DragEvent, RefObject } from "react";
import s from "./images.module.css";
import LoggerStore from "../store/LoggerStore";
import ImagesStore from "../store/ImagesStore";
import { observer } from "mobx-react-lite";

const Image = observer(() => {
  if (!ImagesStore.selectedImage) return null;

  return (
    <img
      key={ImagesStore.selectedImage.name}
      className={s.image}
      alt='Исходное изображение'
      src={ImagesStore.selectedImage.src}
    />
  );
});

interface IImagesProps {
  filePickerRef: RefObject<HTMLInputElement>;
}

export const Images = observer(({ filePickerRef }: IImagesProps) => {
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
        LoggerStore.setNotification({
          text: `Файл ${file.name} не был добавлен - это не изображение`,
          type: "warning",
        });
        return false;
      }
    });

    const images = files.map((image) => {
      return {
        name: image.name,
        src: URL.createObjectURL(image),
        size: image.size,
      };
    });

    if (filePickerRef.current && filePickerRef.current?.files) {
      filePickerRef.current.files = dt.files; // Это костыль пока не готово получение массива
    }
    ImagesStore.setOriginalImages(images);
    setIsDrag(false);
  };

  return (
    <div
      className={s.image_wrapper}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
    >
      {ImagesStore.selectedImage ? (
        <Image />
      ) : isDrag ? (
        <p>Отпустите для загрузки</p>
      ) : (
        <p>Перетащите файлы сюда</p>
      )}
    </div>
  );
});
