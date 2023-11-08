// import { memo } from "react";

export interface FileListProps {
  files: File[];
  //   images?: string | undefined;
}

export const FileList = (props: React.PropsWithChildren<FileListProps>) => {
  return (
    <ul>
      {props.files.map((file: File) => (
        <li key={`${file.name}_${file.lastModified}`}>
          {/* <img src={props?.images[index]} alt='' /> */}
          <span>{file.name}</span>{" "}
          <span>({Math.round(file.size / 1000)}kb)</span>
        </li>
      ))}
    </ul>
  );
};

FileList.displayName = "FileList";
