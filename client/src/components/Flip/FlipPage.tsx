import styles from "./styles/FlipPage.module.scss";
import { useRef, useState } from "react";
// import { FileList } from "./FileList";
import { FileGet } from "./common/FileGet";
// import { mapFileListToArray } from "./utils";

// import { validation } from "./validation";
import { Input } from "./common/Input";
import { Button } from "./common/Button";
import { Alert } from "./alerts/Alert";

export const FlipPage = () => {
  const refPreloadFile = useRef<HTMLDivElement>(null);
  const refInput = useRef<HTMLInputElement>(null);
  const refForm = useRef<HTMLFormElement>(null);

  const [files, setFiles] = useState<File | null>();
  const [filesAfter, setFilesAfter] = useState<File>();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isStatus, setIsStatus] = useState<string>("");
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const preloadFileBackground: string = "url('./../../../drag_drop.svg')";

  function dragStart(event: DragEvent) {
    event.preventDefault();
    setIsDrag(true);
  }
  function dragLeave(event: DragEvent) {
    event.preventDefault();
    setIsDrag(false);
  }

  function onDrop(event: DragEvent) {
    event.preventDefault();
    setIsDrag(false);
    setFiles(event.dataTransfer?.files[0]);
  }

  const onClick = () => {
    if (refInput.current) {
      refInput.current.click();
    }
  };

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
      if (!event || !files) return;

      event.preventDefault();

      const apiAddress = " http://localhost:3333/flip";
      const method = "POST";

      const formData = new FormData(event.currentTarget);
      console.log(...formData);
      formData.append("image", files);

      const params = {
        method: method,
        body: formData,
      };

      const response = await fetch(apiAddress, params);

      if (!response.ok) {
        setIsStatus("error");
        const data = await response.json();
        throw new Error(data.message);
      }

      const arrayBuffer = await response.arrayBuffer();
      const arrayBufferView = new Uint8Array(arrayBuffer);
      const file = new File([arrayBufferView], "new-" + files?.name);

      setFilesAfter(file);
      setIsDisabled(true);
      setIsStatus("success");
    } catch (error) {
      if (error instanceof Error) {
        setIsStatus("error");
        console.error(error);
      } else {
        console.error("Unexpected error:", error);
        setIsStatus("error");
      }
    }
  };

  return (
    <div className={styles.flip}>
      <header className={styles.flip__header}>
        <h2 className={styles.flip__title}>
          Выберите настройки для эффекта Flip
        </h2>
      </header>

      <form
        action='http://localhost:3333/flip'
        method='post'
        className={styles.flip__form}
        onSubmit={onSubmit}
        ref={refForm}
      >
        <div className={styles.flip__wrapper}>
          <div
            className={styles.flip__preloadFile}
            ref={refPreloadFile}
            style={{
              backgroundImage: files ? "" : preloadFileBackground,
            }}
            onDragStart={(e) => dragStart(e)}
            onDragOver={(e) => dragStart(e)}
            onDragLeave={(e) => dragLeave(e)}
            onDrop={onDrop}
          >
            {files && <FileGet file={files} />}
          </div>

          <div className={styles.flip__afterFile}>
            {filesAfter && <FileGet file={filesAfter} fileNew={filesAfter} />}
          </div>
        </div>

        <div className={styles.flip__settings}>
          <div>
            <Input
              type='file'
              id='toChooseFile'
              multiple={true}
              onChange={onChangeFiles}
              className={styles.flip__chooseFile}
              name='image'
              hidden={true}
              accept='.png,.jpeg,.jpg'
              refInput={refInput}
            />
            <Button
              type='button'
              text='Выбрать файл'
              className={styles.flip__button}
              onClick={onClick}
              disabled={isDisabled}
            />
            {files && (
              <Button text='Применить' className={styles.flip__button} />
            )}
          </div>
        </div>
      </form>
      {isStatus && <Alert status={isStatus} />}
    </div>
  );
};
