import { useState, ChangeEvent, FormEvent, useRef } from "react";
import s from "./rotatePage.module.css";
import { TextInput } from "./TextInput";
import { Button } from "./Button";
import { Alert } from "./Alert";
import { Checkbox } from "./Checkbox";
import { ColorInput } from "./ColorInput";
import { Images } from "./Images";

export interface INotification {
  text: string;
  type?: "error" | "warning" | "success" | "info";
}
const RotatePage = () => {
  const filePickerRef = useRef<HTMLInputElement>(null);
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const [originalImage, setOriginalImage] = useState<File[]>();
  const [processedImage, setProcessedImage] = useState<File[]>();

  const [notification, setNotification] = useState<INotification>();
  const [usedBackground, setUsedBackground] = useState(false);

  interface ILog {
    error: Error | any;
    type?: "error" | "warning" | "success" | "info";
  }
  const log = ({ type = "error", error }: ILog) => {
    if (error instanceof Error) {
      console.error(error);
      setNotification({ text: error.message, type });
    } else {
      console.error("Неизвестная ошибка:", error);
      setNotification({ text: `Неизвестная ошибка: ${error}` });
    }
  };

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setOriginalImage([...e.target.files]);
    }
  };

  const onSend = async (e: FormEvent<HTMLFormElement> | undefined) => {
    try {
      if (!e || !originalImage) return;

      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const image = formData.getAll("image")[0];
      formData.delete("image");
      formData.append("image", image);
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
      const files = originalImage.map((image) => {
        return new File([arrayBufferView], image?.name); // Вот эта штука может сломатся
      });

      setNotification({
        text: "Обработка завершена, вы можете скачать изображение",
        type: "success",
      });
      setProcessedImage(files);
    } catch (error) {
      log({ type: "error", error });
    }
  };

  const onDownload = () => {
    if (!processedImage) return;
    processedImage.forEach((image) => {
      if (!downloadRef.current || !processedImage) return;
      downloadRef.current.href = URL.createObjectURL(image);
      downloadRef.current.download = image.name;
      downloadRef.current?.click();
    });

    setOriginalImage(undefined);
    setProcessedImage(undefined);
  };

  return (
    <div className={s.wrapper}>
      <Images
        originalImage={originalImage}
        setOriginalImage={setOriginalImage}
        processedImage={processedImage}
        setNotification={setNotification}
        filePickerRef={filePickerRef}
      />
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
            accept='image/*'
            onChange={onImageChange}
            name='image'
            multiple
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
          onClick={onDownload}
          disabled={!processedImage}
        />

        <a ref={downloadRef} hidden />

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
