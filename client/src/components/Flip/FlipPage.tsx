import styles from "./FlipPage.module.css";
import { RefObject, useRef, useState } from "react";
// import image1 from "https://i.pinimg.com/originals/fb/03/4d/fb034dcee0463abdaeb6919c47ddddd3.jpg";
export const FlipPage = () => {
  const ref = useRef<HTMLInputElement>(null);
  const refImage = useRef<HTMLImageElement>(null);
  const refFlip_X = useRef<HTMLInputElement>(null);
  const refFlip_Y = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | undefined>();
  const [flipX, setFlipX] = useState<boolean | undefined>(true);
  const [flipY, setFlipY] = useState<boolean | undefined>(true);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const a = URL.createObjectURL(event.target.files[0]);
      setImage(a);
    }
  };

  const getImageflipX = function () {
    if (flipX) {
      refImage.current.style.transform = "scaleX(-1) ";
    } else {
      refImage.current.style.transform = "scaleX(1) ";
    }
  };
  const getImageflipY = function () {
    if (flipY) {
      refImage.current.style.transform = "scaleY(-1) ";
    } else {
      refImage.current.style.transform = "scaleY(1) ";
    }
  };

  //   regexp = /^\D*\w*.*\//gm;

  return (
    <div className={styles.flip}>
      <h2 className={styles.flip__title}>
        Выберите настройки для эффекта Flip
      </h2>
      <div className={styles.flip__preloadFile}>
        <img src={image} ref={refImage} alt='your image' id='preloadFile' />
      </div>
      <form
        action='http://localhost:3333/flip'
        method='post'
        className={styles.flip__form}
      >
        <fieldset className={styles.flip__fieldset}>
          <input
            type='file'
            id='toChooseFile'
            className={styles.flip__chooseFile}
            ref={ref}
            onChange={onImageChange}
          />
          <label htmlFor='toChooseFile' className={styles.flip__labelFile}>
            Загрузить файл
          </label>
        </fieldset>
        <fieldset className={styles.flip__fieldset}>
          <legend className={styles.flip__legend}>Положение отражения</legend>
          <div className=''>
            <label htmlFor='Flip-X' className={styles.flip__label}>
              Отразить по горизонтали ( FLIP - X)
            </label>
            <input
              type='checkbox'
              id='Flip-X'
              value={"true"}
              name='Flip-X'
              ref={refFlip_X}
              onChange={() => {
                setFlipX(!flipX);
                getImageflipX();
              }}
            />
          </div>
          <div className=''>
            <label htmlFor='Flip-Y' className={styles.flip__label}>
              Отразить по горизонтали ( FLIP - Y)
            </label>
            <input
              type='checkbox'
              id='Flip-Y'
              value={"false"}
              name='Flip-Y'
              ref={refFlip_Y}
              onChange={() => {
                setFlipY(!flipY);
                getImageflipY();
              }}
            />
          </div>
        </fieldset>
        <fieldset className={styles.flip__fieldset}>
          <legend className={styles.flip__legend}>Коррекция цвета</legend>
          <label htmlFor='red' className={styles.flip__label}>
            Синий
          </label>
          <input type='range' id='red' />
          <label htmlFor='green' className={styles.flip__label}>
            Зеленый
          </label>
          <input type='range' id='green' />
          <label htmlFor='blue' className={styles.flip__label}>
            Синий
          </label>
          <input type='range' id='blue' />
        </fieldset>
        <fieldset className={styles.flip__fieldset}>
          <legend className={styles.flip__legend}>Степень сжатия</legend>
          <div className=''>
            <label htmlFor='lite' className={styles.flip__label}>
              Лайт
            </label>
            <input type='radio' id='lite' name='optimization' />
          </div>
          <div className=''>
            <label htmlFor='middle' className={styles.flip__label}>
              Средняя
            </label>
            <input type='radio' id='middle' name='optimization' />
          </div>
          <div className=''>
            <label htmlFor='hard' className={styles.flip__label}>
              Максимальная
            </label>
            <input type='radio' id='hard' name='optimization' />
          </div>
        </fieldset>
        <button type='submit' id='submitButton'>
          Применить
        </button>
        <button type='button' className={styles.flip__loadButton}>
          Скачать
        </button>
      </form>
    </div>
  );
};
