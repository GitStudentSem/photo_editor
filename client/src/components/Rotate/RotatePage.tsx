import { useState, ChangeEvent, FormEvent, useRef } from "react";
import s from "./style.module.css";
import { UploadControl } from "./UploadControl";

const RotatePage = () => {
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<any>(""); // TODO Определить тип картинки, заменить any
  const [angle, setAngle] = useState(0);
  const [background, setBackground] = useState("red");

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onSend = async (e: FormEvent<HTMLButtonElement> | undefined) => {
    try {
      if (!e) return;
      e.preventDefault();
      const formData = new FormData();

      formData.append("image", image);
      //   formData.append("angle", angle.toString());
      //   formData.append("background", background);

      const response = await fetch("http://localhost:3333/rotate", {
        method: "POST",
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        body: formData,
      });
      console.log("res", response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.image_wrapper}>
        {image && (
          <img
            className={s.image}
            alt='Изображение не может быть прочитано, попробуйте выбрать другое'
            src={image}
          />
        )}
      </div>
      <div className={s.controls_wrapper}>
        <div className={s.input_wrapper}>
          <button
            onClick={() => {
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
        {/* <div className={s.input_wrapper}>
          <UploadControl onChange={onImageChange} accept='.png,.jpeg'>
            Выбрать фотографию
          </UploadControl>
        </div> */}

        <label className={s.input_wrapper}>
          <p>На какой угол нужно повернуть изображение?</p>
          <input
            className={s.setting_input}
            type='text'
            placeholder='Угол поворота'
            onChange={(e) => {
              setAngle(+e.target.value);
            }}
          />
        </label>

        <label className={s.input_wrapper}>
          <p>Какого цвета установить задний фон?</p>
          <input
            className={s.setting_input}
            type='text'
            placeholder='Задний фон'
            onChange={(e) => {
              setBackground(e.target.value);
            }}
          />
        </label>

        <button onClick={onSend}>Отправить</button>
      </div>
    </div>
  );
};
export { RotatePage };
