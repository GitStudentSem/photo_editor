import { useRef, useState, useEffect, memo } from "react";
import { mapFileListToArray } from "./utils";
export interface DropZoneProps {
  onDragStateChange?: (isDragActive: boolean) => void;
  onDrag?: () => void;
  onDragIn?: () => void;
  onDragOut?: () => void;
  onDrop?: () => void;
  onFilesDrop: (files: (File | null)[]) => void;
}
export const DropZone = memo(
  (props: React.PropsWithChildren<DropZoneProps>) => {
    const {
      onDragStateChange,
      onFilesDrop,
      onDrag,
      onDragIn,
      onDragOut,
      onDrop,
    } = props;

    const [isDragActive, setIsDragActive] = useState(false);
    const dropZoneRef = useRef<null | HTMLDivElement>(null);

    const handleDragIn = (event: globalThis.DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      onDragIn?.();
      if (!event.dataTransfer) return;
      if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
        setIsDragActive(true);
      }
    };

    const handleDragOut = (event: globalThis.DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      onDragOut?.();

      setIsDragActive(false);
    };

    const handleDrag = (event: globalThis.DragEvent) => {
      event.preventDefault();
      event.stopPropagation();

      onDrag?.();
      if (!isDragActive) {
        setIsDragActive(true);
      }
    };

    const handleDrop = (event: globalThis.DragEvent) => {
      event.preventDefault();
      event.stopPropagation();

      setIsDragActive(false);
      onDrop?.();
      if (!event.dataTransfer) return;
      if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
        const files = mapFileListToArray(event.dataTransfer.files);

        onFilesDrop?.(files);
        event.dataTransfer.clearData();
      }
    };

    useEffect(() => {
      onDragStateChange?.(isDragActive);
    }, [isDragActive, onDragStateChange]);

    const dragEnter = "dragenter";
    const dragLeave = "dragleave";
    const dragOver = "dragover";
    const dropEvent = "drop";

    useEffect(() => {
      const tempZoneRef = dropZoneRef?.current;

      if (tempZoneRef) {
        tempZoneRef.addEventListener(dragEnter, handleDragIn);
        tempZoneRef.addEventListener(dragLeave, handleDragOut);
        tempZoneRef.addEventListener(dragOver, handleDrag);
        tempZoneRef.addEventListener(dropEvent, handleDrop);
      }

      return () => {
        tempZoneRef?.removeEventListener(dragEnter, handleDragIn);
        tempZoneRef?.removeEventListener(dragLeave, handleDragOut);
        tempZoneRef?.removeEventListener(dragOver, handleDrag);
        tempZoneRef?.removeEventListener(dropEvent, handleDrop);
      };
    });

    return (
      <div ref={dropZoneRef} id='DropZone'>
        {props.children}
      </div>
    );
  }
);
DropZone.displayName = "DropZone";
{
  /* <DropZone
            onDragStateChange={onDragStateChange}
            onFilesDrop={onFilesDrop}
          ></DropZone> */
}
  //   const onDragStateChange = (dragActive: boolean) => {
  //     if (!isDropActive) setIsDropActive(dragActive);
  //   };

  //   const onFilesDrop = (files: (File | null)[]) => {
  //     if (files.length === 0) return;
  //     setFiles(files);
  //     // files.forEach((file: File | null) => {
  //     // //   images.push(file);
  //     // });

  //     if (refImage?.current) {
  //       refImage.current.style.opacity = "0%";
  //     }
  //   };