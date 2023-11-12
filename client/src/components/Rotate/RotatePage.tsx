import { useState, ChangeEvent, FormEvent, useRef } from "react";
import s from "./rotatePage.module.css";
import { TextInput } from "./TextInput";
import { Button } from "./Button";
import { Alert } from "./Alert";
import { Checkbox } from "./Checkbox";
import { ColorInput } from "./ColorInput";

const RotatePage = () => {
  const filePickerRef = useRef<HTMLInputElement>(null);
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const [originalImage, setOriginalImage] = useState<File>();
  const [processedImage, setProcessedImage] = useState<any>(null);
  const [notification, setNotification] = useState<{
    text: string;
    type?: "error" | "warning" | "success" | "info";
  }>();
  const [usedBackground, setUsedBackground] = useState(false);

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setOriginalImage(e.target.files[0]);
    }
  };

  const onSend = async (e: FormEvent<HTMLFormElement> | undefined) => {
    try {
      if (!e || !originalImage) return;

      e.preventDefault();

      const formData = new FormData(e.currentTarget);

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

      setNotification({
        text: "Обработка завершена, вы можете скачать изображение",
        type: "success",
      });
      setProcessedImage(blob);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        setNotification({ text: error.message, type: "error" });
      } else {
        console.error("Unexpected error:", error);
        setNotification({ text: `Неизвестная ошибка: ${error}` });
      }
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.images_wrapper}>
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
      <form className={s.controls_wrapper} onSubmit={onSend}>
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

        <TextInput
          placeholder='Угол поворота'
          label='На какой угол нужно повернуть изображение?'
          type='number'
          name='angle'
          required
        />

        <Checkbox
          text='Использоавать задний фон?'
          checked={usedBackground}
          onChange={() => setUsedBackground(!usedBackground)}
        />

        <ColorInput
          label='Какого цвета установить задний фон?'
          name='background'
          disabled={!usedBackground}
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

        {notification?.text && (
          <Alert
            text={notification.text}
            type={notification.type}
            onClose={() => {
              setNotification({
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
