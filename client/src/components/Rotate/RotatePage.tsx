import { useState, ChangeEvent, FormEvent, useRef } from "react";
import s from "./style.module.css";

const RotatePage = () => {
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [originalImage, setOriginalImage] = useState<File>();
  const [processedImage, setProcessedImage] = useState<any>(null);
  const [angle, setAngle] = useState("0");
  const [background, setBackground] = useState("red");
  const [errorMessage, setErrorMessage] = useState("");

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0]);
      setOriginalImage(e.target.files[0]);
    }
  };

  const onSend = async (e: FormEvent<HTMLButtonElement> | undefined) => {
    try {
      if (!e || !originalImage) return;

      e.preventDefault();
      const formData = new FormData();
      formData.append("image", originalImage);
      formData.append("angle", angle);
      formData.append("background", background);
      const response: any = await fetch("http://localhost:3333/rotate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const arrayBuffer = await response.arrayBuffer();

      var arrayBufferView = new Uint8Array(arrayBuffer);
      var blob = new Blob([arrayBufferView]);
      console.log(arrayBuffer);
      setProcessedImage(blob);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        setErrorMessage(error.message);
      } else {
        console.error("Unexpected error:", error);
        setErrorMessage(`Неизвестная ошибка: ${error}`);
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
      <form className={s.controls_wrapper}>
        <div className={s.input_wrapper}>
          <button
            className={s.file_button}
            onClick={(e) => {
              e.preventDefault();
              if (!filePickerRef.current) return;
              filePickerRef.current.click();
            }}
          >
            Загрузить изображение
          </button>
          <input
            ref={filePickerRef}
            type='file'
            hidden
            accept='.png,.jpeg'
            onChange={onImageChange}
          />
        </div>

        <label className={s.input_wrapper}>
          <p>На какой угол нужно повернуть изображение?</p>
          <input
            className={s.setting_input}
            type='text'
            placeholder='Угол поворота'
            value={angle}
            onChange={(e) => {
              setAngle(e.target.value);
            }}
          />
        </label>

        <label className={s.input_wrapper}>
          <p>Какого цвета установить задний фон?</p>
          <input
            className={s.setting_input}
            type='text'
            placeholder='Задний фон'
            value={background}
            onChange={(e) => {
              setBackground(e.target.value);
            }}
          />
        </label>

        <button onClick={onSend} disabled={!originalImage}>
          Отправить
        </button>
        {processedImage && (
          <a
            download={originalImage?.name}
            //   onClick={onSend}
            href={URL.createObjectURL(processedImage)}
            //   disabled={!processedImage}
          >
            Скачать
          </a>
        )}
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </div>
  );
};
export { RotatePage };
