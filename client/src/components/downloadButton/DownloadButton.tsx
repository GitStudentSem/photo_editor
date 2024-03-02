import { Button } from "../controls";
import { observer } from "mobx-react-lite";
import ImagesStore from "../../store/ImagesStore";

const DownloadButton = observer(() => {
  const onDownload = () => {
    for (const image of ImagesStore.processedImages) {
      const link = document.createElement("a");
      link.href = image.src;
      link.download = image.name;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    ImagesStore.setOriginalImages([]);
    ImagesStore.setProcessedImages([]);
  };

  return (
    <Button
      text='Скачать'
      onClick={onDownload}
      disabled={!ImagesStore.processedImages?.length}
      style={{ width: "48%" }}
    />
  );
});
export { DownloadButton };
