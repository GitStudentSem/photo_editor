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
      (event: DragEvent<React.MutableRefObject<HTMLDivElement>>) => {
        event.preventDefault();
        event.stopPropagation();
        onDragIn?.();

        if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
          setIsDragActive(true);
        }
      },
      [onDragIn]
    );

    const handleDragOut = useCallback(
      (event: Event) => {
        event.preventDefault();
        event.stopPropagation();
        onDragOut?.();

        setIsDragActive(false);
      },
      [onDragOut]
    );

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

    const handleDrop = useCallback(
      (event: DragEvent<React.MutableRefObject<HTMLDivElement>>) => {
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

    useEffect(() => {
      onDragStateChange?.(isDragActive);
    }, [isDragActive]);

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
    }, []);
    return (
      <div ref={dropZoneRef} id='DropZone'>
        {props.children}
      </div>
    );
  }
);
DropZone.displayName = "DropZone";
