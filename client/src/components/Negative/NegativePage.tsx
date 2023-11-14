import { ChangeEvent, useRef, useState } from "react";
import styles from "./NegativePage.module.css";
import Button from "./ui/Button/Button";
import Checkbox from "./ui/Checkbox/Checkbox";

export const NegativePage = () => {
  const [photo, setPhoto] = useState<File>();
  const [processedPhoto, setProcessedPhoto] = useState<Blob | null>(null);
  const [isAlpha, setIsAlpha] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string>();
  const filePickerRef = useRef<HTMLInputElement>(null);

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
    <div className={styles.negativePage}>
      <div className={styles.photo}>
        <div className={styles.photo__wrapper}>
          <div className={styles.photo__before}>
            {photo ? <img src={URL.createObjectURL(photo)} alt="Фото" /> : <></>}</div>
          <div className={styles.photo__after}>
            {processedPhoto ? <img src={URL.createObjectURL(processedPhoto)} alt="Фото" /> : <></>}</div>
        </div>
      </div>
      <div className={styles.settings}>
        <Button text="Выбрать фото" onClick={(e) => {
          e.preventDefault();
          if (!filePickerRef.current) return;
          filePickerRef.current.click();
        }} />
        <input type="file" accept="image/*" onChange={onChange} ref={filePickerRef} hidden />
        <label>
          Использовать α канал
          <Checkbox type="checkbox" onChange={prev => setIsAlpha(!prev)} disabled={!photo} />
        </label>
        <Button type="submit"
                onClick={sendPhoto}
                text="Отправить на обработку"
                disabled={!photo && !processedPhoto}
        />
        <Button type="submit"
                onClick={sendPhoto}
                text="Скачать фото"
                disabled={!processedPhoto}
        />
        <p>{submitStatus}</p>
      </div>
    </div>
  );
};
