import { useRef } from "react";
export interface FileListProps {
  files: (File | null)[];
}
export const FileList = (props: React.PropsWithChildren<FileListProps>) => {
  const refImage = useRef<HTMLImageElement>(null);

  return (
    <ul>
      {props.files.map((file: File | null) => {
        if (!file) return <></>;
        return (
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
          </li>
        );
      })}
    </ul>
  );
};

FileList.displayName = "FileList";
