import {
  useRef,
  useState,
  useEffect,
  memo,
  useCallback,
  DragEvent,
} from "react";
export interface DropZoneProps {
  onDragStateChange?: (isDragActive: boolean) => void;
  onDrag?: () => void;
  onDragIn?: () => void;
  onDragOut?: () => void;
  onDrop?: () => void;
  onFilesDrop: (files: File[]) => void;
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

    // Create state to keep track when dropzone is active/non-active:
    const [isDragActive, setIsDragActive] = useState(false);
    // Prepare ref for dropzone element:
    const dropZoneRef = useRef<null | HTMLDivElement>(null);

    // Create helper method to map file list to array of files:
    const mapFileListToArray = (files: FileList) => {
      const array = [];

      for (let i = 0; i < files.length; i++) {
        array.push(files.item(i));
      }

      return array;
    };

    // Create handler for dragenter event:
    const handleDragIn = useCallback(
      (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        onDragIn?.();

        if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
          setIsDragActive(true);
        }
      },
      [onDragIn]
    );

    // Create handler for dragleave event:
    const handleDragOut = useCallback(
      (event: Event) => {
        event.preventDefault();
        event.stopPropagation();
        onDragOut?.();

        setIsDragActive(false);
      },
      [onDragOut]
    );

    // Create handler for dragover event:
    const handleDrag = useCallback(
      (event: Event) => {
        event.preventDefault();
        event.stopPropagation();

        onDrag?.();
        if (!isDragActive) {
          setIsDragActive(true);
        }
      },
      [isDragActive, onDrag]
    );

    // Create handler for drop event:
    const handleDrop = useCallback(
      (event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();

        setIsDragActive(false);
        onDrop?.();

        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
          const files = mapFileListToArray(event.dataTransfer.files);

          onFilesDrop?.(files);
          event.dataTransfer.clearData();
        }
      },
      [onDrop, onFilesDrop]
    );

    // Obser active state and emit changes:
    useEffect(() => {
      onDragStateChange?.(isDragActive);
    }, [isDragActive]);

    // Attach listeners to dropzone on mount:
    useEffect(() => {
      const tempZoneRef = dropZoneRef?.current;
      if (tempZoneRef) {
        tempZoneRef.addEventListener("dragenter", handleDragIn);
        tempZoneRef.addEventListener("dragleave", handleDragOut);
        tempZoneRef.addEventListener("dragover", handleDrag);
        tempZoneRef.addEventListener("drop", handleDrop);
      }

      // Remove listeners from dropzone on unmount:
      return () => {
        tempZoneRef?.removeEventListener("dragenter", handleDragIn);
        tempZoneRef?.removeEventListener("dragleave", handleDragOut);
        tempZoneRef?.removeEventListener("dragover", handleDrag);
        tempZoneRef?.removeEventListener("drop", handleDrop);
      };
    }, []);
    return <div ref={dropZoneRef}>{props.children}</div>;
  }
);
DropZone.displayName = "DropZone";
