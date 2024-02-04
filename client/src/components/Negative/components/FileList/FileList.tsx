import styles from "./FileList.module.scss";
import { observer } from "mobx-react-lite";
import TabPanel from "./TabPanel/TabPanel";
import { useState } from "react";
import { ImageItem } from "../ImageItem/ImageItem";
import { PhotoStore } from "../../store/store";

const FileList = observer(() => {
  const tabs = ["unprocessed", "processed"];
  const [activeTab, setActiveTab] = useState(0);
  const { photo, processedPhoto, currentPhoto } = PhotoStore;

  return (
    <div className={styles.fileList}>
      <TabPanel
        tabs={tabs}
        activeTab={tabs[activeTab]}
        setActiveTab={setActiveTab}
      />
      <div className={styles.fileList__wrapper}>
        {tabs[activeTab] === "unprocessed"
          ? photo &&
            photo.map((item, index) => {
              return (
                <ImageItem
                  key={item.src + index}
                  imageSrc={item.src}
                  imageTitle={item.name}
                  imageInfo={(item.size / (1024 * 1024)).toFixed(2)}
                  isActive={item.src === currentPhoto}
                />
              );
            })
          : processedPhoto &&
            processedPhoto.map((item, index) => {
              return (
                <ImageItem
                  key={item.src + index}
                  imageSrc={item.src}
                  imageTitle={photo[index].name}
                  imageInfo={(item.blob.size / (1024 * 1024)).toFixed(2)}
                  isActive={item.src === currentPhoto}
                />
              );
            })}
      </div>
    </div>
  );
});

export default FileList;
