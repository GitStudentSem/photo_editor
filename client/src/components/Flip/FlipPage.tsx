import styles from "./FlipPage.module.css";
import { useRef, useState, useCallback } from "react";
import { DropZone } from "./DropZone";
import { FileList } from "./FileList";
import { mapFileListToArray } from "./utils";
// import { validation } from "./validation";
// import { onSubmit } from "./onSubmit";

export const FlipPage = () => {
  const refImage = useRef<HTMLImageElement>(null);
  const refPreloadFile = useRef<HTMLDivElement>(null);
  const refFlip_X = useRef<HTMLInputElement>(null);
  const refFlip_Y = useRef<HTMLInputElement>(null);
  const [flipX, setFlipX] = useState<boolean | undefined>(true);
  const [flipY, setFlipY] = useState<boolean | undefined>(true);
  const [isDropActive, setIsDropActive] = useState(false);
  const [files, setFiles] = useState<(File | null)[]>([]);
  const images: (Blob | null)[] = [];

  const preloadFileBackground: string = "url('./../../../drag_drop.svg')";

  const onDragStateChange = useCallback((dragActive: boolean) => {
    if (!isDropActive) setIsDropActive(dragActive);
  }, []);

  const onFilesDrop = (files: (File | null)[]) => {
    if (files.length === 0) return;
    setFiles(files);
    files.forEach((file: File | null) => {
      images.push(file);
    });

    if (refImage?.current) {
      refImage.current.style.opacity = "0%";
    }
  };

  const onChangeFiles = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) return;
      if (event.target.files && event.target.files.length > 0) {
        const files = mapFileListToArray(event.target.files);
        onFilesDrop?.(files);
      }
    },
    []
  );
  return (
    <div className={styles.flip}>
      <h2 className={styles.flip__title}>
        Выберите настройки для эффекта Flip
      </h2>
      <form
        action='http://localhost:3333/flip'
        method='post'
        className={styles.flip__form}
        // onSubmit={onSubmit}
      >
        <div
          className={styles.flip__preloadFile}
          ref={refPreloadFile}
          style={{
            backgroundImage: files.length > 0 ? "" : preloadFileBackground,
          }}
        >
          <DropZone
            onDragStateChange={onDragStateChange}
            onFilesDrop={onFilesDrop}
          >
            <input
              type='file'
              id='toChooseFile'
              multiple={true}
              onChange={onChangeFiles}
              className={styles.flip__chooseFile}
            />
            <label htmlFor='toChooseFile' className={styles.flip__labelFile}>
              Загрузить файл
            </label>
            <FileList files={files} />
            {files.length === 0 ? "" : <h3>Files to upload: {files.length}</h3>}
          </DropZone>
        </div>
        <div className={styles.flip__wrapperInputs}>
          <fieldset className={styles.flip__fieldset}></fieldset>
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
          <button
            type='submit'
            id='submitButton'
            className={styles.flip__button}
          >
            Применить
          </button>
          <button type='button' className={styles.flip__loadButton}>
            Скачать
          </button>
        </div>
      </form>
    </div>
  );
};
