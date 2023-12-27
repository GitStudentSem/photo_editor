import { useRef, useState, useEffect } from "react";
import { LinkDownload } from "./LinkDownload";
export interface FileI {
  files: File;
  fileNew?: File;
}
export const FileGet = ({ files, fileNew }: FileI) => {
  const imageRef = useRef<HTMLImageElement>(null);
  //   const [href, setHref] = useState<string>("");

  //   useEffect(() => {
  //     if (fileNew) {
  //       const href = URL.createObjectURL(fileNew);
  //       setHref(href);
  //     }
  //   }, []);

  if (files != undefined && files) {
    let name = "";
    if (files.name.length > 10) {
      name = files.name.slice(0, 15) + "....";
    }
    return (
      <li key={files.name + files.size}>
        <img src={URL.createObjectURL(files)} alt={name} ref={imageRef} />
        <p>{name}</p>
        <p>
          <strong>({Math.round(files.size / 1024)}kb)</strong>
          {fileNew && (
            <LinkDownload
              href={URL.createObjectURL(fileNew)}
              fileName={fileNew.name}
            />
          )}
        </p>
      </li>
    );
    // return (
    //   <ul>
    //     {/* {files.map((file) => {
    //       let name = "";
    //       if (file.name.length > 10) {
    //         name = file.name.slice(0, 15) + "....";
    //       }
    //       return (
    //         <li key={file.name + file.size}>
    //           <img src={URL.createObjectURL(file)} alt={name} ref={imageRef} />
    //           <p>{name}</p>
    //           <p>
    //             <strong>({Math.round(file.size / 1024)}kb)</strong>
    //             {fileNew && (
    //               <LinkDownload
    //                 href={URL.createObjectURL(fileNew)}
    //                 fileName={fileNew.name}
    //               />
    //             )}
    //           </p>
    //         </li>
    //       );
    //     })} */}
    //   </ul>
    // );
  } else {
    return;
  }
};
FileGet.displayName = "FileGet";
