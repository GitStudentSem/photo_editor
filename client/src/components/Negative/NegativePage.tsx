import { ChangeEvent, useState } from "react";
import styles from "./NegativePage.module.css";

export const NegativePage = () => {
  const [photo, setPhoto] = useState<File>();
  const [processedPhoto, setProcessedPhoto] = useState<Blob | null>(null);
  const [isAlpha, setIsAlpha] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string>();

  function onChange(e: ChangeEvent<HTMLInputElement>): void {
    if (e.target.files) {
      setPhoto(e.target.files[0]);
      setProcessedPhoto(null);
    }
  }

  async function sendPhoto(e) {
    const data = new FormData();
    data.append("image", photo as Blob);
    const res: any = await fetch("http://localhost:3333/negative", {
      method: "POST",
      body: data,
    });

    if (!res.ok) {
      console.log("Ошибка запроса");
    }

    const arrayBuffer = await res.arrayBuffer();  //преобразование resizedBuffer с сервера в Blob для вставки фото
    const arrayBufferBytes = new Uint8Array(arrayBuffer);
    const blob = new Blob([arrayBufferBytes]);

    setProcessedPhoto(blob);
  }

  return (
    <div className={styles["negativePage"]}>  {/* classname не используется */}
      <div className={styles.negativePage__wrapper}>
        <div className={styles.photo}>
          <div className={styles.photo__wrapper}>
            {photo ? <img src={URL.createObjectURL(photo)} alt="Фото" /> : <></>}
            {processedPhoto ? <img src={URL.createObjectURL(processedPhoto)} alt="Фото" /> : <></>}
          </div>
        </div>
        <div className={styles.settings}>
          <input type="file" onChange={onChange} />
          <div className={styles["settings__item"]}>
            <label>
              Настройка n
              <input type="text" placeholder="Какая то настройка!" />
            </label>
          </div>
          <div className={styles["settings__item"]}>
            <label>
              Настройка n
              <input type="text" placeholder="Какая то настройка!" />
            </label>
          </div>
          <div className={styles["settings__item"]}>
            <label>
              Настройка n
              <input type="text" placeholder="Какая то настройка!" />
            </label>
          </div>
          <button type="submit" onClick={sendPhoto}>
            Отправить на обработку
          </button>
          <p>{submitStatus}</p>
        </div>
      </div>
    </div>
  );
};
