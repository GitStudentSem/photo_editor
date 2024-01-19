import styles from "./ProcessingPhoto.module.scss";
import { observer } from "mobx-react-lite";
import { useRef, MouseEvent } from "react";
import { PhotoStore } from "../../store/store";

const ProcessingPhoto = observer(() => {
  const resizeRef = useRef<HTMLDivElement>(null);
  const beforeWrapperRef = useRef<HTMLDivElement>(null);

  function onMouseMove(e: MouseEvent) {
    if (!beforeWrapperRef.current || !resizeRef.current) return;

    const elemLeft = beforeWrapperRef.current.getBoundingClientRect().left;
    resizeRef.current.style.left = `${e.clientX - elemLeft}px`;
    beforeWrapperRef.current.style.width = `${e.clientX - elemLeft}px`;
    console.log("func");
  }

  return (
    <div className={styles.photo}>
      <div
        className={styles.photo__wrapper}
        onMouseMove={(e) => {
          if (PhotoStore.processedPhoto.length === 0) return;
          onMouseMove(e);
        }}
      >
        <div
          className={
            PhotoStore.processedPhoto.length > 0
              ? styles.before_processed
              : styles.before
          }
          ref={beforeWrapperRef}
        >
          {!!PhotoStore.photo.length && (
            <img
              src={URL.createObjectURL(PhotoStore.photo[0])}
              alt='UnprocessedPhoto'
              className={styles.before__img}
            />
          )}
        </div>
        <span
          className={
            PhotoStore.processedPhoto
              ? styles.resize
              : styles.resize_notProcessed
          }
          ref={resizeRef}
        ></span>
        <div className={styles.after}>
          {!!PhotoStore.processedPhoto.length && (
            <img
              src={URL.createObjectURL(PhotoStore.processedPhoto[0])}
              alt='ProcessedPhoto'
              className={styles.after__img}
            />
          )}
        </div>
      </div>
    </div>
  );
});

export default ProcessingPhoto;
