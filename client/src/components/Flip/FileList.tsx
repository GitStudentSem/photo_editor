import { useRef, useState } from "react";
export interface FileListProps {
  files: File[];
}

export const FileList = (props: React.PropsWithChildren<FileListProps>) => {
  const [checked, setChecked] = useState(false);
  const refInput = useRef<HTMLInputElement>(null);
  const refImage = useRef<HTMLImageElement>(null);
  const [choosenPhotos, choosenPhotosOptions] = useState([]);
  const choosenPhotosArray: [] = [];
  return (
    <ul>
      {props.files.map((file: File) => (
        <li key={`${file.name}_${file.lastModified}`}>
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            style={{
              height: "auto",
              width: "100%",
            }}
            ref={refImage}
          />
          <span>{file.name}</span>{" "}
          <span>({Math.round(file.size / 1000)}kb)</span>
          <input
            type='checkbox'
            ref={refInput}
            onChange={() => {
              if (refInput.current) {
                setChecked(!checked);
                refInput.current.checked = checked;
                const b = refInput.current.value;
                choosenPhotosArray.push(b);
                choosenPhotosOptions(choosenPhotosArray);
                // console.log(refInput, refInput.current.checked, "element");
                console.log(choosenPhotosOptions(choosenPhotosArray), "array");
              }
            }}
          />
        </li>
      ))}
    </ul>
  );
};

FileList.displayName = "FileList";
