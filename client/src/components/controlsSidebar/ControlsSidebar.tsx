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

  const onSend = async (e: FormEvent<HTMLFormElement>) => {
    try {
      if (!ImagesStore.originalImages) return;

      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const images = formData.getAll("image");

      formData.delete("image");

      for (const image of images) {
        formData.append("image", image);
      }
      console.log(formData.getAll("image"))
      

      const response: Response = await fetch(
        `http://localhost:3333${location.pathname}`,
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

      // { data: ArrayBuffer } костыль, не очень ясно как то типизировать
      const processed = data.map((image: { data: ArrayBuffer }, i: number) => {
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
      if (error instanceof Error) {
        LoggerStore.log({ type: "error", error });
      }
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
          type='submit'
        />

        <DownloadButton />
      </div>

      {LoggerStore.notification?.text && <Alert />}
    </form>
  );
});
export { ControlsSidebar };
