import { useRef } from "react";
export interface FileListProps {
  files: (File | null)[];
}
export const FileList = (props: React.PropsWithChildren<FileListProps>) => {
  const refImage = useRef<HTMLImageElement>(null);
  console.log(props.files, "files111");

  return (
    <ul style={{ height: "auto" }}>
      {props.files.map((file: File | null) => {
        if (!file) return <></>;
        return (
          <li key={`${file.name}_${file.lastModified}`}>
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              style={{
                height: "auto",
                width: "30%",
                objectFit: "contain",
              }}
              ref={refImage}
            />
            <span>{file.name}</span>{" "}
            <span>({Math.round(file.size / 1024)}kb)</span>
          </li>
        );
      })}
    </ul>
  );
};

FileList.displayName = "FileList";
