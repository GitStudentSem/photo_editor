import { useState, FormEvent, useRef } from "react";
import s from "./rotatePage.module.css";
import { TextInput } from "../../textInput/TextInput";
import { Button } from "../../button/Button";
import { Alert } from "../../alert/Alert";
import { Checkbox } from "../../checkbox/Checkbox";
import { ColorInput } from "../../colorInput/ColorInput";
import { LargePreview } from "../../largePreview/LargePreview";
import { observer } from "mobx-react-lite";
import ImagesStore from "../../../store/ImagesStore";
import LoggerStore from "../../../store/LoggerStore";
import { DownloadButton } from "../../downloadButton/DownloadButton";
import { UploadButton } from "../../uploadButton/UploadButton";
import { SmallPreviews } from "../../smallPreviews/SmallPreviews";

const RotatePage = observer(() => {
  const filePickerRef = useRef<HTMLInputElement>(null);

  const [usedBackground, setUsedBackground] = useState(false);

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

      const response: any = await fetch("http://localhost:3333/rotate", {
        method: "POST",
        body: formData,
      });

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
    <div className={s.wrapper}>
      <div className={s.header}></div>

      <LargePreview filePickerRef={filePickerRef} />

      <SmallPreviews />

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

          <DownloadButton />
        </div>

        {LoggerStore.notification?.text && <Alert />}
      </form>
    </div>
  );
});
export { RotatePage };
