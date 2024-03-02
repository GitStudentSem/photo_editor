import { ChangeEvent } from "react";

import { Button } from "../controls";

import { observer } from "mobx-react-lite";
import ImagesStore from "../../store/ImagesStore";

interface IUploadButton {
  filePickerRef: React.RefObject<HTMLInputElement>;
}

const UploadButton = observer(({ filePickerRef }: IUploadButton) => {
  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    if (e.target.files[0]) {
      const files = [...e.target.files].map((image) => {
        return {
          name: image.name,
          size: image.size,
          src: URL.createObjectURL(image),
        };
      });

      ImagesStore.setOriginalImages(files);
    }
  };

  return (
    <>
      <Button
        text='Загрузить изображения'
        onClick={(e) => {
          e.preventDefault();
          if (!filePickerRef.current) return;
          filePickerRef.current.click();
        }}
      />

      <input
        ref={filePickerRef}
        type='file'
        hidden
        accept='image/*'
        onChange={onImageChange}
        name='image'
        multiple
      />
    </>
  );
});
export { UploadButton };
