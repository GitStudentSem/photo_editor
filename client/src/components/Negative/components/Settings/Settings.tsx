import styles from "./Settings.module.scss";
import { ChangeEvent, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { PhotoStore } from "../../store/store";
import { observer } from "mobx-react-lite";

import Button from "../../ui/Button/Button";
import Checkbox from "../../ui/Checkbox/Checkbox";
import Alert from "../../ui/Alert/Alert";

const Settings = observer(() => {
  const downloadRef = useRef<HTMLImageElement>(null);
  const downloadPickerRef = useRef<HTMLAnchorElement>(null);
  const filePickerRef = useRef<HTMLInputElement>(null);

  const [isAlpha, setIsAlpha] = useState(false);
  const [notification, setNotification] = useState<"error" | "success" | "wait" | null>(null);


  function onChange(e: ChangeEvent<HTMLInputElement>): void {
    if (e.target.files) {
      PhotoStore.setPhoto(e.target.files);
      PhotoStore.setProcessedPhoto(null);
    }
  }

  async function sendPhoto() {
    if (!PhotoStore.photo) return;
    setNotification("wait");

    let processedPhotoArr = [];

    for (let i = 0; i < PhotoStore.photo.length; i++) {
      const data = new FormData();
      data.append('alpha', String(isAlpha))
      data.append("image", PhotoStore.photo[i] as Blob);
      const res: any = await fetch("http://localhost:3333/negative", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        setNotification("error");
      }

      const arrayBuffer = await res.arrayBuffer();  //преобразование resizedBuffer с сервера в Blob для вставки фото
      const arrayBufferBytes = new Uint8Array(arrayBuffer);
      const blob = new Blob([arrayBufferBytes]);

      processedPhotoArr = [...processedPhotoArr, blob]
    }

    PhotoStore.setProcessedPhoto(processedPhotoArr);
  }


  function downloadPhoto() {
    if (!PhotoStore.processedPhoto || !downloadRef.current) return;
    downloadPickerRef.current.href = downloadRef.current.src;
    downloadPickerRef.current.click();
  }

  function renderNotification() {
    if (!notification) return;
    setTimeout(() => setNotification(null), 5000);
    return createPortal(<Alert status="success" />, document.body);
  }

  return (
    <div className={styles.settings}>
      {renderNotification()}
      <Button text="Выбрать фото" onClick={(e) => {
        e.preventDefault();
        if (!filePickerRef.current) return;
        filePickerRef.current.click();
      }} />
      <input type="file" accept="image/*" onChange={onChange} ref={filePickerRef} hidden multiple />
      <label>
        Использовать α канал
        <Checkbox onChange={prev => setIsAlpha(!prev)} disabled={!PhotoStore.photo} />
      </label>
      <Button type="submit"
              onClick={sendPhoto}
              text="Отправить на обработку"
              disabled={!PhotoStore.photo || !!PhotoStore.processedPhoto}
      />
      <Button onClick={downloadPhoto}
              text="Скачать фото"
              disabled={!PhotoStore.processedPhoto}
      />
      <a ref={downloadPickerRef} download={PhotoStore.photo ? PhotoStore.photo[0].name : "file.jpg"} hidden></a>
    </div>
  );
});

export default Settings;