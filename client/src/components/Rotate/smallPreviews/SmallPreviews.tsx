import { useState } from "react";
import s from "./smallPreviews.module.css";

import { observer } from "mobx-react-lite";
import { Tabs } from "../tabs/Tabs";
import ImagesStore from "../store/ImagesStore";
import { Link } from "../link/Link";

interface IPropsPreview {
  image: File;
  isProcessed?: boolean;
}

const Preview = observer(({ image, isProcessed }: IPropsPreview) => {
  return (
    <ol
      className={`${s.preview_wrapper} ${
        ImagesStore.selectedImage?.name === image.name ? s.selected : ""
      }`}
      onClick={() => ImagesStore.setSelectedImage(image)}
    >
      <img
        className={s.image}
        alt='изображение'
        src={URL.createObjectURL(image)}
      />
      <div className={s.info_wrapper}>
        <p className={`${s.name} ${!isProcessed && s.original}`}>
          {image.name}
        </p>
        <p className={s.size}>{(image.size / (1024 * 1024)).toFixed(2)}MB</p>
        {isProcessed && (
          <Link
            text='Скачать'
            href={URL.createObjectURL(image)}
            download={image.name}
          />
        )}
      </div>
    </ol>
  );
});

const SmallPreviews = observer(() => {
  const tabs = ["Не обработанные", "Обработанные"];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={s.wrapper}>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className={s.previews}>
        <ul
          className={s.list_wrapper}
          style={{
            display: tabs[activeTab] === "Не обработанные" ? "block" : "none",
          }}
        >
          {ImagesStore.originalImages.map((image, i) => {
            return <Preview image={image} key={"original" + image.name + i} />;
          })}
        </ul>
        <ul
          className={s.list_wrapper}
          style={{
            display: tabs[activeTab] === "Обработанные" ? "block" : "none",
          }}
        >
          {ImagesStore.processedImages.map((image, i) => {
            return (
              <Preview
                image={image}
                key={"processed" + image.name + i}
                isProcessed
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
});
export { SmallPreviews };
