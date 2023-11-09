import { useRef, useState } from "react";
export interface FileListProps {
  files: File[];
}

export interface choosenPhotosI {
  choosenPhotos: { checked: boolean; id: string }[] | null;
}

export const FileList = (props: React.PropsWithChildren<FileListProps>) => {
  const [checked, setChecked] = useState(false);
  const refInput = useRef<HTMLInputElement>(null);
  const refImage = useRef<HTMLImageElement>(null);
  const [choosenPhotos, choosenPhotosOptions] = useState<choosenPhotosI>([
    { checked: false, id: "" },
  ]);

  function removeDuplicates(arr: []) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }
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
            id={file.name}
            onChange={() => {
              if (refInput.current) {
                setChecked(!checked);
                refInput.current.checked = checked;
                const obj: { checked: boolean } = {
                  checked: refInput.current.checked,
                  id: refInput.current.id,
                };
                // checkboxArrayOptions.push(obj);
                choosenPhotosOptions((arr) => [...arr, obj]);
                removeDuplicates(choosenPhotos);

                console.log(checkboxArrayOptions, "options");
                // console.log(refInput, refInput.current.checked, "element");
                console.log(choosenPhotos, "array");
              }
            }}
          />
        </li>
      ))}
    </ul>
  );
};

FileList.displayName = "FileList";
