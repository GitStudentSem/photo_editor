import { useRef, ReactNode } from "react";
import s from "./layout.module.css";
import { LargePreview } from "../largePreview/LargePreview";
import { observer } from "mobx-react-lite";
import { SmallPreviews } from "../smallPreviews/SmallPreviews";
import { ControlsSidebar } from "../controlsSidebar/ControlsSidebar";

const Layout = observer(({ children }: { children: ReactNode }) => {
  const filePickerRef = useRef<HTMLInputElement>(null);

  return (
    <div className={s.wrapper}>
      <div className={s.header}></div>

      <LargePreview filePickerRef={filePickerRef} />

      <SmallPreviews />

      <ControlsSidebar>{children}</ControlsSidebar>
    </div>
  );
});
export { Layout };
