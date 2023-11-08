import styles from "./FlipPage.module.css";
import { useRef, useState, useCallback } from "react";
import { DropZone } from "./DropZone";
import { FileList } from "./FileList";

export const FlipPage = () => {
  const ref = useRef<HTMLInputElement>(null);
  const refImage = useRef<HTMLImageElement>(null);
  const refPreloadFile = useRef<HTMLDivElement>(null);
  const refFlip_X = useRef<HTMLInputElement>(null);
  const refFlip_Y = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | undefined>();
  const [flipX, setFlipX] = useState<boolean | undefined>(true);
  const [flipY, setFlipY] = useState<boolean | undefined>(true);

  const [isDropActive, setIsDropActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0] && refImage.current) {
      const a = URL.createObjectURL(event.target.files[0]);
      setImage(a);
      refImage.current.style.opacity = "100%";
    }
  };

  console.log(image, "image");

  const onDragStateChange = useCallback((dragActive: boolean) => {
    setIsDropActive(dragActive);
  }, []);

  const onFilesDrop = useCallback((files: File[]) => {
    setFiles(files);
    files.forEach((file: File) => {
      const a = URL.createObjectURL(file);
      setImage(a);
    });

    if (refImage?.current) {
      refImage.current.style.opacity = "100%";
    }
  }, []);
  return (
    <div className={styles.flip}>
      <h2 className={styles.flip__title}>
        Выберите настройки для эффекта Flip
      </h2>
      <form
        action='http://localhost:3333/flip'
        method='post'
        className={styles.flip__form}
      >
        <div>
          <DropZone
            onDragStateChange={onDragStateChange}
            onFilesDrop={onFilesDrop}
          >
            <div className={styles.flip__preloadFile} ref={refPreloadFile}>
              <img
                src={image}
                ref={refImage}
                alt='your image'
                id='preloadFile'
                style={{ opacity: 0 }}
              />
            </div>
            {files.length === 0 ? (
              <h3>No files to upload</h3>
            ) : (
              <h3>Files to upload: {files.length}</h3>
            )}
            <FileList files={files} />
          </DropZone>
        </div>
        <div className={styles.flip__wrapperInputs}>
          <fieldset className={styles.flip__fieldset}>
            <input
              type='file'
              id='toChooseFile'
              className={styles.flip__chooseFile}
              ref={ref}
              onChange={onImageChange}
              multiple={true}
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
                  //   getImageflipX();
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
                  //   getImageflipY();
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
