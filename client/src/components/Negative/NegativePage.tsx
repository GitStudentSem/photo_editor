import { ChangeEvent, useRef, useState } from "react";

import styles from "./NegativePage.module.css";
import Button from "./ui/Button/Button";
import Checkbox from "./ui/Checkbox/Checkbox";
import Notification from "./ui/Notification/Notification";
import ImageItem from "./ImageItem";

export const NegativePage = () => {
    console.log("main component render");
    const [photo, setPhoto] = useState<FileList | Blob[]>();
    const [processedPhoto, setProcessedPhoto] = useState<Blob[]>();

    const [isAlpha, setIsAlpha] = useState(true);

    const filePickerRef = useRef<HTMLInputElement>(null);
    const downloadRef = useRef<HTMLImageElement>(null);
    const downloadPickerRef = useRef<HTMLAnchorElement>(null);

    const [notification, setNotification] = useState<"success" | "error" | null>(null);

    const [drag, setDrag] = useState(false);

    function onChange(e: ChangeEvent<HTMLInputElement>): void {
      if (e.target.files) {
        setPhoto(e.target.files);
        setProcessedPhoto(null);
        photo ? console.log([...photo]) : false;
      }
    }

    async function sendPhoto() {
      if (!photo) return;

      for (let i = 0; i < photo.length; i++) {
        const data = new FormData();
        data.append("image", photo[i] as Blob);
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

        setProcessedPhoto([]);
        setProcessedPhoto(prev => [...prev, blob]);
        //также ты пытаешься передать список processedPhoto, чтобы в дальнейшем заменит айтемы в блоке //масссива фоток на обработанные фотки
      }

      setNotification("success");
    }

    function downloadPhoto() {
      if (!processedPhoto || !downloadRef.current) return;
      downloadPickerRef.current.href = downloadRef.current.src;
      downloadPickerRef.current.click();
    }

    function dragStartHandler(e) {
      e.preventDefault();
      setDrag(true);
    }

    function dragLeaveHandler(e) {
      e.preventDefault();
      setDrag(false);
    }

    function onDropHandler(e) {
      e.preventDefault();
      setDrag(false);
      setPhoto(e.dataTransfer.files);
    }

    /*TODO:   - избавиться от лишних рендеров на страничке, а именно:
    *             разделить всё по компонентам и добиться точечного рендеринга
              - начать работать над опцией массива фоток
              - изменить ui используя ui kit
    */

    function renderNotification() {
      if (!notification) return;
      setTimeout(() => setNotification(null), 5000);
      return <Notification type={notification} />;
    }

    return (
      <div className={styles.negativePage}>
        {renderNotification()}
        <div className={styles.photo}>
          <div className={styles.photo__wrapper}>
            <div className={!drag ? styles.photo__before : styles.photo__before + " " + styles.drag}
                 onDragStart={e => dragStartHandler(e)}
                 onDragOver={e => dragStartHandler(e)}
                 onDragLeave={e => dragLeaveHandler(e)}
                 onDrop={onDropHandler}
            >
              {photo ? <img src={URL.createObjectURL(photo[0])} alt="Фото" /> : <>Перетащите файл сюда</>}
            </div>
            <div className={styles.photo__after}>
              {processedPhoto ?
                <img src={URL.createObjectURL(processedPhoto[0])} alt="Фото" ref={downloadRef} /> : <></>}
            </div>
          </div>
        </div>
        <div className={styles.fileList}>
          <div className={styles.fileList__wrapper}>
            {photo ? [...photo].map((item, index) => {
              return <ImageItem key={item.name + index}
                                imageSrc={URL.createObjectURL(item)}
                                imageTitle={item.name}
                                imageInfo={item.type}
              />;
            }) : false}
          </div>
        </div>
        <div className={styles.settings}>
          <Button text="Выбрать фото" onClick={(e) => {
            e.preventDefault();
            setProcessedPhoto(null);
            if (!filePickerRef.current) return;
            filePickerRef.current.click();
          }} />
          <input type="file" accept="image/*" onChange={onChange} ref={filePickerRef} hidden multiple />
          <label>
            Использовать α канал
            <Checkbox onChange={prev => setIsAlpha(!prev)} disabled={!photo} />
          </label>
          <Button type="submit"
                  onClick={sendPhoto}
                  text="Отправить на обработку"
                  disabled={!photo || !!processedPhoto}
          />
          <Button onClick={downloadPhoto}
                  text="Скачать фото"
                  disabled={!processedPhoto}
          />
          <a ref={downloadPickerRef} download={photo ? photo[0].name : "file.jpg"} hidden></a>
        </div>
      </div>
    );
  }
;
