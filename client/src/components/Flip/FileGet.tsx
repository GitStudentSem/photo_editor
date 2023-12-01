import { useRef, useState } from "react";
import { LinkDownload } from "./common/LinkDownload";
export interface FileI {
  file: File;
}
export const FileGet = ({ file }: FileI) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [href, setHref] = useState("");
  if (imageRef.current) {
    setHref(imageRef.current.src);
  }
  return (
    <>
      <img
        src={URL.createObjectURL(file)}
        alt={file.name}
        style={{
          height: "auto",
          width: "30%",
          objectFit: "contain",
        }}
        ref={imageRef}
      />
      <p>{file.name}</p>
      <p>
        <strong>({Math.round(file.size / 1024)}kb) </strong>
        <LinkDownload href={href} fileName={file.name} />
      </p>
    </>
  );
};

FileGet.displayName = "FileGet";
