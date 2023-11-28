import styles from "./FlipPage.module.css";
import { useRef, useState } from "react";
// import { DropZone } from "./DropZone";
import { FileList } from "./FileList";
import { mapFileListToArray } from "./utils";

// import { validation } from "./validation";
import { Input } from "./Input";

export const FlipPage = () => {
  //   const refImage = useRef<HTMLImageElement>(null);
  const refPreloadFile = useRef<HTMLDivElement>(null);
  const refInput = useRef<HTMLInputElement>(null);
  const refForm = useRef<HTMLFormElement>(null);

  //   const [isDropActive, setIsDropActive] = useState(false);
  const [files, setFiles] = useState<(File | null)[]>([]);
  const [files1, setFiles1] = useState<(File | null)[]>([]);
  const [preview, setPreview] = useState<File | null>();
  const [after, setAfter] = useState<File | null>();

  const images: (File | null)[] = [];
  const preloadFileBackground: string = "url('./../../../drag_drop.svg')";

  const onChangeFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    if (event.target.files && event.target.files.length > 0) {
      const files = mapFileListToArray(event.target.files);
      setFiles(files);
      setPreview(files[0]);
    }
  };

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement> | undefined
  ) => {
    if (!event) return;
    event.preventDefault();
    const apiAddress = " http://localhost:3333/flip";
    const method = "POST";
    const formData = new FormData(event.currentTarget);
    console.log(...formData);
    try {
      const params = {
        method: method,
        body: formData,
      };

      const response = await fetch(apiAddress, params);
      //   console.log(response, "body");
      const arrayBuffer = await response.arrayBuffer();
      const arrayBufferView = new Uint8Array(arrayBuffer);
      console.log(arrayBufferView, "arrayBufferView");

      const file = new File([arrayBufferView], `image.jpeg`);
      setAfter(file);
      images.push(file);
      setFiles1(images);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className={styles.flip}>
      <h2 className={styles.flip__title}>
        Выберите настройки для эффекта Flip
      </h2>
      <form
        action='http://localhost:3333/flip'
        method='post'
        className={styles.flip__form}
        onSubmit={onSubmit}
        ref={refForm}
      >
        <div
          className={styles.flip__preloadFile}
          ref={refPreloadFile}
          style={{
            backgroundImage: files.length > 0 ? "" : preloadFileBackground,
          }}
        >
          <Input
            type='file'
            id='toChooseFile'
            multiple={true}
            onChange={onChangeFiles}
            className={styles.flip__chooseFile}
            name='image'
            accept='.png,.jpeg,.jpg'
            ref1={refInput}
          />

          <label htmlFor='toChooseFile' className={styles.flip__labelFile}>
            Загрузить файл
          </label>

          {/* {files.length > 0 && <FileList files={files} />}
          {files1.length > 0 && <FileList files={files1} />} */}
          {preview && <img src={URL.createObjectURL(preview)} />}
          {after && <img src={URL.createObjectURL(after)} />}
          {files.length === 0 ? "" : <h3>Files to upload: {files.length}</h3>}
        </div>
        <div className={styles.flip__wrapperInputs}>
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
