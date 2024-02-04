import { observer } from "mobx-react-lite";
import styles from "./ProcessingPhoto.module.scss";
import { PhotoStore } from "../../store/store";

const ProcessingPhoto = observer(() => {
  const { currentPhoto } = PhotoStore;

  return (
    <div className={styles.processingPhoto}>
      <div className={styles.processingPhoto__wrapper}>
        {!!currentPhoto && (
          <img src={currentPhoto} className={styles.processingPhoto__photo} />
        )}
      </div>
    </div>
  );
});

export default ProcessingPhoto;
