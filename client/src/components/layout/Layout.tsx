import { useRef } from "react";
import type { ReactNode } from "react";
import s from "./layout.module.css";
import { LargePreview } from "../largePreview/LargePreview";
import { observer } from "mobx-react-lite";
import { SmallPreviews } from "../smallPreviews/SmallPreviews";
import { ControlsSidebar } from "../controlsSidebar/ControlsSidebar";
import { Header } from "../header/Header";

const Layout = observer(({ children }: { children: ReactNode }) => {
  const filePickerRef = useRef<HTMLInputElement>(null);

  return (
    <div className={s.wrapper}>
      <Header />

      <LargePreview filePickerRef={filePickerRef} />

      <SmallPreviews />

      <ControlsSidebar>{children}</ControlsSidebar>
    </div>
  );
});
export { Layout };
