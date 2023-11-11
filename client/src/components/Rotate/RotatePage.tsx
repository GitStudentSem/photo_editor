import { useState, ChangeEvent, FormEvent, useRef } from "react";
import s from "./style.module.css";
import { SettingInput } from "./SettingInput";
import { Button } from "./Button";
import { Alert } from "./Alert";

const RotatePage = () => {
  const filePickerRef = useRef<HTMLInputElement>(null);
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const [originalImage, setOriginalImage] = useState<File>();
  const [processedImage, setProcessedImage] = useState<any>(null);
  const [notificationMessage, setNotificationMessage] = useState<{
    text: string;
    type?: "error" | "warning" | "success" | "info";
  }>();
  const formRef = useRef(null);
  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setOriginalImage(e.target.files[0]);
    }
  };

  const onSend = async (e: FormEvent<HTMLFormElement> | undefined) => {
    try {
      if (!e || !originalImage || !formRef.current) return;

      e.preventDefault();

      const formData = new FormData(formRef.current);

      const response: any = await fetch("http://localhost:3333/rotate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const arrayBuffer = await response.arrayBuffer();
      const arrayBufferView = new Uint8Array(arrayBuffer);
      const blob = new Blob([arrayBufferView]);

      setNotificationMessage({
        text: "Обработка завершена, вы можете скачать изображение",
        type: "success",
      });
      setProcessedImage(blob);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        setNotificationMessage({ text: error.message, type: "error" });
      } else {
        console.error("Unexpected error:", error);
        setNotificationMessage({ text: `Неизвестная ошибка: ${error}` });
      }
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.image_wrapper}>
        <div className={s.image_before}>
          {originalImage && (
            <img
              className={s.image}
              alt='Изображение не может быть прочитано, попробуйте выбрать другое'
              src={URL.createObjectURL(originalImage)}
            />
          )}
        </div>
        <div className={s.image_after}>
          {processedImage && (
            <img
              className={s.image}
              alt='Изображение не может быть прочитано, попробуйте выбрать другое'
              src={URL.createObjectURL(processedImage)}
            />
          )}
        </div>
      </div>
      <form className={s.controls_wrapper} onSubmit={onSend} ref={formRef}>
        <div className={s.input_wrapper}>
          <Button
            text='Загрузить изображение'
            onClick={(e) => {
              e.preventDefault();
              if (!filePickerRef.current) return;
              filePickerRef.current.click();
            }}
          />
          <input
            ref={filePickerRef}
            type='file'
            hidden
            accept='.png,.jpeg'
            onChange={onImageChange}
            name='image'
          />
        </div>

        <SettingInput
          placeholder='Угол поворота'
          label='На какой угол нужно повернуть изображение?'
          type='number'
          name='angle'
          required
        />

        <SettingInput
          placeholder='Задний фон'
          label='Какого цвета установить задний фон?'
          type='text'
          name='background'
        />

        <Button text='Отправить' disabled={!originalImage} />
        <Button
          text='Скачать'
          onClick={() => {
            if (!downloadRef.current) return;

            downloadRef.current.href = URL.createObjectURL(processedImage);

            downloadRef.current?.click();
          }}
          disabled={!processedImage}
        />

        <a ref={downloadRef} download={originalImage?.name} hidden />

        {notificationMessage?.text && (
          <Alert
            text={notificationMessage.text}
            type={notificationMessage.type}
            onClose={() => {
              setNotificationMessage({
                text: "",
              });
            }}
          />
        )}
      </form>
    </div>
  );
};
export { RotatePage };
