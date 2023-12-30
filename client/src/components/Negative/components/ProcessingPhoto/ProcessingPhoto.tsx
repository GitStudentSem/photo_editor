import styles from "./ProcessingPhoto.module.scss";
import { PhotoStore } from "../../store/store";
import { observer } from "mobx-react-lite";

const ProcessingPhoto = observer(() => {
  return (
    <div className={styles.photo}>
      <div className={styles.photo__wrapper}>
        <div className={styles.photo__before}
        >
          {PhotoStore.photo ? <img src={URL.createObjectURL(PhotoStore.photo[0])} alt="Фото" /> :
            <>Перетащите файл сюда</>}
        </div>
        <div className={styles.photo__after}>
          {PhotoStore.processedPhoto ?
            <img src={URL.createObjectURL(PhotoStore.processedPhoto[0])} alt="Фото" /> : <></>}
        </div>
      </div>
    </div>
  );
});

export default ProcessingPhoto;