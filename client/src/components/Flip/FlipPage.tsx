import styles from "./FlipPage.module.css";
import { useRef } from "react";

export const FlipPage = () => {
  const ref = useRef<HTMLInputElement>(null);
  const refImage = useRef<HTMLImageElement>(null);

  //   function previewFile(input: { files: any[] } | undefined) {
  //     const file = input?.files[0];

  //     const reader = new FileReader();

  //     reader.onload = function () {
  //       console.log(reader.result);
  //       const a = reader.readAsText(file);
  //       refImage.src = a;
  //     };

  //     reader.onerror = function () {
  //       console.log(reader.error);
  //     };
  //   }
  //   let path;
  //   if (refImage.current) {
  //     path = refImage.current.src;
  //   }
  const regexp = /^\D*\w*.*\//gm;
  return (
    <div className={styles.flip}>
      <h2 className={styles.flip__title}>
        Выберите настройки для эффекта Flip
      </h2>
      <div
        className={styles.flip__preloadFile}
        onClick={() => {
          if (refImage.current) {
            const path = refImage.current.src;

            console.log(path, "path");
            const a = path.match(regexp);
            const path1 = path.replace(a, "");
            console.log(path1, "AaA");
            return path;
          }
        }}
      >
        <img
          src='sdfsdfsd1f'
          ref={refImage}
          alt='your image'
          id='preloadFile'
        />
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
            <input type='checkbox' id='Flip-X' value={"true"} name='Flip-X' />
          </div>
          <div className=''>
            <label htmlFor='Flip-Y' className={styles.flip__label}>
              Отразить по горизонтали ( FLIP - Y)
            </label>
            <input type='checkbox' id='Flip-Y' value={"false"} name='Flip-Y' />
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
