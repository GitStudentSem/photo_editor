import { useState, DragEvent, RefObject } from "react";
import s from "./images.module.css";
import LoggerStore from "../store/LoggerStore";
import ImagesStore from "../store/ImagesStore";
import { observer } from "mobx-react-lite";

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

    if (filePickerRef.current && filePickerRef.current?.files) {
      filePickerRef.current.files = dt.files; // Это костыль пока не готово получение массива
    }
    ImagesStore.setOriginalImages(files);
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
        {ImagesStore.originalImages ? (
          <ImagesList imagesList={ImagesStore.originalImages} />
        ) : isDrag ? (
          <p>Отпустите для загрузки</p>
        ) : (
          <p>Перетащите файлы сюда</p>
        )}
      </div>
      <div className={s.image_after}>
        {ImagesStore.processedImages && (
          <ImagesList imagesList={ImagesStore.processedImages} />
        )}
      </div>
    </div>
  );
});
