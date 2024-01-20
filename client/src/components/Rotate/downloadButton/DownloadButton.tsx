import { useRef } from "react";
import { Button } from "../button/Button";
import { observer } from "mobx-react-lite";
import ImagesStore from "../store/ImagesStore";

const DownloadButton = observer(() => {
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const onDownload = () => {
    if (!ImagesStore.processedImages) return;
    ImagesStore.processedImages.forEach((image) => {
      if (!downloadRef.current || !ImagesStore.processedImages) return;
      downloadRef.current.href = URL.createObjectURL(image);
      downloadRef.current.download = image.name;
      downloadRef.current?.click();
    });

    ImagesStore.setOriginalImages(undefined);
    ImagesStore.setProcessedImages(undefined);
  };

  return (
    <>
      <Button
        text='Скачать'
        onClick={onDownload}
        disabled={!ImagesStore.processedImages?.length}
        style={{ width: "48%" }}
      />

      <a ref={downloadRef} hidden />
    </>
  );
});
export { DownloadButton };
