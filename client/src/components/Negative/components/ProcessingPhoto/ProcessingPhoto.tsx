import styles from "./ProcessingPhoto.module.scss";
import { PhotoStore } from "../../store/store";
import { observer } from "mobx-react-lite";
import { MouseEvent, useRef } from "react";

const ProcessingPhoto = observer(() => {
  const { photo, processedPhoto } = PhotoStore;
  const resizeRef = useRef(null);
  const beforeWrapperRef = useRef(null);

  function onMouseMove(e: MouseEvent<HTMLSpanElement>) {
    resizeRef.current.style.left = `${e.clientX}px`;
    beforeWrapperRef.current.style.width = `${e.clientX}px`;
  }

  function onMouseLeave() {
    beforeWrapperRef.current.style.width = `50%`;
    resizeRef.current.style.left = "50%";
  }

  return (
    <div className={styles.photo}
         onMouseMove={processedPhoto ? e => onMouseMove(e) : null}
         onMouseLeave={processedPhoto ? onMouseLeave : null}>
      <div className={processedPhoto ? styles.before_processed : styles.before} ref={beforeWrapperRef}>
        {photo && <img src={URL.createObjectURL(photo[0])} alt="" className={styles.before__img} />}
      </div>
      <span className={processedPhoto ? styles.resize : styles.resize_notProcessed} ref={resizeRef}></span>
      <div className={styles.after}>
        {processedPhoto && <img src={URL.createObjectURL(processedPhoto[0])} alt="" className={styles.after__img} />}
      </div>
    </div>
  );
});

export default ProcessingPhoto;