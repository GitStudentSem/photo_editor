import styles from "./styles/FlipPage.module.css";
import { useRef, useState } from "react";
// import { FileList } from "./FileList";
import { FileGet } from "./FileGet";
// import { mapFileListToArray } from "./utils";

// import { validation } from "./validation";
import { Input } from "./common/Input";
import { Button } from "./common/Button";
import { LinkDownload } from "./common/LinkDownload";

export const FlipPage = () => {
  const refPreloadFile = useRef<HTMLDivElement>(null);
  const refInput = useRef<HTMLInputElement>(null);
  const refForm = useRef<HTMLFormElement>(null);

  const [files, setFiles] = useState<File>();
  const [files1, setFiles1] = useState<File>();
  const preloadFileBackground: string = "url('./../../../drag_drop.svg')";

  const onChangeFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFiles(file);
    }
  };

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement> | undefined
  ) => {
    try {
      if (!event || !files1) return;
      event.preventDefault();
      const apiAddress = " http://localhost:3333/flip";
      const method = "POST";
      const formData = new FormData(event.currentTarget);
      console.log(...formData);

      const params = {
        method: method,
        body: formData,
      };

      const response = await fetch(apiAddress, params);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const arrayBuffer = await response.arrayBuffer();
      const arrayBufferView = new Uint8Array(arrayBuffer);
      const file = new File([arrayBufferView], `image.jpeg`);

      setFiles1(file);
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
            backgroundImage: files ? "" : preloadFileBackground,
          }}
        >
          {files && <FileGet file={files} />}
          {files1 && <FileGet file={files1} />}
        </div>

        {files ? (
          <></>
        ) : (
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
        )}
        {files ? (
          <Button
            type='button'
            text='Применить'
            className={styles.flip__button}
          />
        ) : (
          <LinkDownload href='' fileName='' />
        )}
      </form>
    </div>
  );
};
