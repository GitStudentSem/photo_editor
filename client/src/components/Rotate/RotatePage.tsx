import { useState, ChangeEvent, FormEvent } from "react";
import s from "./style.module.css";
import { UploadControl } from "./UploadControl";

const RotatePage = () => {
  const [image, setImage] = useState("");
  const [angle, setAngle] = useState(0);
  const [background, setBackground] = useState("");

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };
  const onSend = (e: FormEvent<HTMLButtonElement> | undefined) => {
    if (!e) return;
    e.preventDefault();
    console.log(image, angle, background);
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
          <UploadControl onChange={onImageChange} accept='.png,.jpeg'>
            Выбрать фотографию
          </UploadControl>
        </div>

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
