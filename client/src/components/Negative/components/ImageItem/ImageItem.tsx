import { PhotoStore } from "../../store/store";
import styles from "./ImageItem.module.scss";
import { memo } from "react";

interface IImageItem {
  imageSrc: string;
  imageTitle: string;
  imageInfo: number | string;
  isActive: boolean
}

export const ImageItem = memo(
  ({ imageSrc, imageTitle, imageInfo, isActive }: IImageItem) => {
    const {setCurrentPhoto} = PhotoStore;

    return (
      <div className={!isActive ? styles.imageItem : styles.imageItem_active} onClick={() => setCurrentPhoto(imageSrc)}>
        <div className={styles.imageItem__wrapper}>
          <img src={imageSrc} alt='Фото' width={50} height={50} />
          <h5>{imageTitle.slice(0, 30)}...</h5>
          <h5>{imageInfo} Мб</h5>
        </div>
      </div>
    );
  }
);
