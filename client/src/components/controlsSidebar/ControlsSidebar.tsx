import { FormEvent, useRef, ReactNode } from "react";
import s from "./controlsSidebar.module.css";
import { Button } from "../controls";
import { Alert } from "../alert/Alert";
import { observer } from "mobx-react-lite";
import ImagesStore from "../../store/ImagesStore";
import LoggerStore from "../../store/LoggerStore";
import { DownloadButton } from "../downloadButton/DownloadButton";
import { UploadButton } from "../uploadButton/UploadButton";

const ControlsSidebar = observer(({ children }: { children: ReactNode }) => {
  const filePickerRef = useRef<HTMLInputElement>(null);

  const onSend = async (e: FormEvent<HTMLFormElement> | undefined) => {
    try {
      if (!e || !ImagesStore.originalImages) return;

      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const images = formData.getAll("image");

      formData.delete("image");
      images.forEach((image) => {
        formData.append("image", image);
      });
      console.log(window.location.pathname);
      const response: any = await fetch(
        `http://localhost:3333${window.location.pathname}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const data = await response.json();

      const processed = data.map((image: any, i: number) => {
        const arrayBufferView = new Uint8Array(image.data);

        const file = new File(
          [arrayBufferView],
          ImagesStore.originalImages[i].name
        );

        return {
          name: file.name,
          src: URL.createObjectURL(file),
          size: file.size,
        };
      });
      ImagesStore.setProcessedImages(processed);

      LoggerStore.setNotification({
        text: "Обработка завершена, вы можете скачать изображение",
        type: "success",
      });
    } catch (error) {
      LoggerStore.log({ type: "error", error });
    }
  };

  return (
    <form className={s.sidebar} onSubmit={onSend}>
      <div className={s.controls_wrapper}>{children}</div>

      <div className={s.load_buttons_wrapper}>
        <UploadButton filePickerRef={filePickerRef} />

        <Button
          text='Отправить'
          disabled={!ImagesStore.originalImages?.length}
          style={{ width: "48%" }}
        />

        <DownloadButton />
      </div>

      {LoggerStore.notification?.text && <Alert />}
    </form>
  );
});
export { ControlsSidebar };
