import { ChangeEvent } from "react";

import { Button } from "../button/Button";

import { observer } from "mobx-react-lite";
import ImagesStore from "../store/ImagesStore";

const UploadButton = observer(
  ({ filePickerRef }: { filePickerRef: React.RefObject<HTMLInputElement> }) => {
    const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        ImagesStore.setOriginalImages([...e.target.files]);
      }
    };

    return (
      <>
        <Button
          text='Загрузить изображение'
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
  }
);
export { UploadButton };
