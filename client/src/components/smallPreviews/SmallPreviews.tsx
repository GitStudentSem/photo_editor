import { useState } from "react";
import s from "./smallPreviews.module.css";
import { observer } from "mobx-react-lite";
import { Tabs } from "../controls";
import ImagesStore from "../../store/ImagesStore";
import type { Image } from "../../store/ImagesStore";

import { Link } from "../controls";

interface IPropsPreview {
  image: Image;
  isProcessed?: boolean;
}

const Preview = observer(({ image, isProcessed }: IPropsPreview) => {
  const { name, src, size } = image;
  return (
    <ol
      className={`${s.preview_wrapper} ${
        ImagesStore.selectedImage?.name === name ? s.selected : ""
      }`}
      onClick={() =>
        ImagesStore.setSelectedImage({
          name,
          src,
          size,
        })
      }
    >
      <img className={s.image} alt='изображение' src={src} />
      <div className={s.info_wrapper}>
        <p className={`${s.name} ${!isProcessed && s.original}`}>{name}</p>
        <p className={s.size}>{(size / (1024 * 1024)).toFixed(2)}MB</p>
        {isProcessed && <Link text='Скачать' href={src} download={name} />}
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
        {tabs[activeTab] === "Не обработанные" && (
          <ul className={s.list_wrapper}>
            {ImagesStore.originalImages.map((image, i) => {
              return (
                <Preview image={image} key={`original-${image.name}-${i}`} />
              );
            })}
          </ul>
        )}

        {tabs[activeTab] === "Обработанные" && (
          <ul className={s.list_wrapper}>
            {ImagesStore.processedImages.map((image, i) => {
              return (
                <Preview
                  image={image}
                  key={`processed-${image.name}-${i}`}
                  isProcessed
                />
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
});
export { SmallPreviews };
