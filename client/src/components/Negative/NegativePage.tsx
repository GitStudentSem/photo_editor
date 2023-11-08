import { FormEvent, useState } from "react";
import styles from "./NegativePage.module.css";

export const NegativePage = () => {
  const [photo, setPhoto] = useState<string>();
  const [isAlpha, setIsAlpha] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string>();

  function onChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target.files) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  }

  async function getEditedPhoto() {
    console.log("function is working...", photo, typeof photo);

    const res = await fetch("http://localhost:3333/negative", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        photo,
        isAlpha: false,
      }),
    }).then(res => res.json()).then(data => console.log(data));
  }

  function onSubmit(e: FormEvent<HTMLButtonElement>) {
    if (photo) {
      e.preventDefault();
      setSubmitStatus("Обрабатываем ваше фото. Подождите...");
      getEditedPhoto()
      //another function do post request to the controller
    } else {
      setSubmitStatus("Загрузите фото перед отправкой");
      return;
    }
  }

  return (
    <div className={styles.negativePage}>
      <div className={styles.negativePage__wrapper}>
        <div className={styles.photo}>
          <div className={styles.photo__wrapper}>
            <img src={photo} alt="Фото" />
          </div>
        </div>
        <div className={styles.settings}>
          <input type="file" onChange={onChange} />
          <div className={styles.settings__item}>
            <label>
              Настройка n
              <input type="text" placeholder="Какая то настройка!" />
            </label>
          </div>
          <div className={styles.settings__item}>
            <label>
              Настройка n
              <input type="text" placeholder="Какая то настройка!" />
            </label>
          </div>
          <div className={styles.settings__item}>
            <label>
              Настройка n
              <input type="text" placeholder="Какая то настройка!" />
            </label>
          </div>
          <button type="submit" onClick={onSubmit}>
            Отправить на обработку
          </button>
          <p>{submitStatus}</p>
        </div>
      </div>
    </div>
  );
};
