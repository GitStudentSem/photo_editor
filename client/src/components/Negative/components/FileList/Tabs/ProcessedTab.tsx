import { PhotoStore } from "../../../store/store";
import { ImageItem } from "../../ImageItem/ImageItem";
import { observer } from "mobx-react-lite";
import { memo } from "react";

const ProcessedTab = observer(() => {
  return (
    <>
      {PhotoStore.processedPhoto ? PhotoStore.processedPhoto.map((item, index) => {
        return <ImageItem key={item + index}
                          imageSrc={URL.createObjectURL(item)}
                          imageTitle={"hello"}
                          imageInfo={item.type}
        />;
      }) : "Обработанных фото пока что нет)"}
    </>
  );
});

const memoizedProcessedTab = memo(ProcessedTab);

export default memoizedProcessedTab;