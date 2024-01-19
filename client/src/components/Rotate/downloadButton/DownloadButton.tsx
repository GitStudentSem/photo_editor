import React, {
  useRef,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from "react";
import { Button } from "../button/Button";
import { observer } from "mobx-react-lite";
import ImagesStore from "../store/ImagesStore";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const DownloadButton: React.FC<ButtonProps> = observer((props) => {
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
        {...props}
      />

      <a ref={downloadRef} hidden />
    </>
  );
});
export { DownloadButton };
