import { useRef, useState, useEffect } from "react";
import { LinkDownload } from "./LinkDownload";
export interface FileI {
  file: File;
  fileNew?: File;
}
export const FileGet = ({ file, fileNew }: FileI) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [src, setSrc] = useState<string>("");
  const [href, setHref] = useState<string>("");
  useEffect(() => {
    const src = URL.createObjectURL(file);
    setSrc(src);
    if (fileNew) {
      const href = URL.createObjectURL(fileNew);
      setHref(href);
    }
  }, []);

  if (file) {
    return (
      <>
        <img src={src} alt={file.name} ref={imageRef} />
        <p>{file.name}</p>
        <p>
          <strong>({Math.round(file.size / 1024)}kb) </strong>
          {fileNew && <LinkDownload href={href} fileName={fileNew.name} />}
        </p>
      </>
    );
  } else {
    return;
  }
};

FileGet.displayName = "FileGet";
