import { useState, FormEvent, useRef } from "react";
import s from "./rotatePage.module.css";
import { TextInput } from "../textInput/TextInput";
import { Button } from "../button/Button";
import { Alert } from "../alert/Alert";
import { Checkbox } from "../checkbox/Checkbox";
import { ColorInput } from "../colorInput/ColorInput";
import { Images } from "../images/Images";
import { observer } from "mobx-react-lite";
import ImagesStore from "../store/ImagesStore";
import LoggerStore from "../store/LoggerStore";
import { DownloadButton } from "../downloadButton/DownloadButton";
import { UploadButton } from "../uploadButton/UploadButton";

const RotatePage = observer(() => {
  const filePickerRef = useRef<HTMLInputElement>(null);

  const [usedBackground, setUsedBackground] = useState(false);

  const onSend = async (e: FormEvent<HTMLFormElement> | undefined) => {
    try {
      if (!e || !ImagesStore.originalImages) return;

      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const image = formData.getAll("image")[0];
      formData.delete("image");
      formData.append("image", image);
      const response: any = await fetch("http://localhost:3333/rotate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const arrayBuffer = await response.arrayBuffer();
      const arrayBufferView = new Uint8Array(arrayBuffer);
      const files = ImagesStore.originalImages.map((image) => {
        return new File([arrayBufferView], image?.name); // Вот эта штука может сломатся
      });

      LoggerStore.setNotification({
        text: "Обработка завершена, вы можете скачать изображение",
        type: "success",
      });
      ImagesStore.setProcessedImages(files);
    } catch (error) {
      LoggerStore.log({ type: "error", error });
    }
  };

  return (
    <div className={s.wrapper}>
      <Images filePickerRef={filePickerRef} />

      <form className={s.sidebar} onSubmit={onSend}>
        <div className={s.controls_wrapper}>
          <TextInput
            placeholder='Угол поворота'
            label='На какой угол нужно повернуть изображение?'
            type='number'
            name='angle'
            required
          />

          <Checkbox
            text='Использоавать задний фон?'
            checked={usedBackground}
            onChange={() => setUsedBackground(!usedBackground)}
          />

          <ColorInput
            label='Какого цвета установить задний фон?'
            name='background'
            disabled={!usedBackground}
          />
        </div>

        <div className={s.load_buttons_wrapper}>
          <UploadButton filePickerRef={filePickerRef} />

          <Button
            text='Отправить'
            disabled={!ImagesStore.originalImages?.length}
            style={{ width: "48%" }}
          />

          <DownloadButton style={{ width: "48%" }} />
        </div>

        {LoggerStore.notification?.text && <Alert />}
      </form>
    </div>
  );
});
export { RotatePage };
