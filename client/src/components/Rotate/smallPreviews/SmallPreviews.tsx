import { useState } from "react";
import s from "./smallPreviews.module.css";

import { observer } from "mobx-react-lite";
import { Tabs } from "../tabs/Tabs";

const SmallPreviews = observer(() => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={s.wrapper}>
      <Tabs
        tabs={["Обработанные", "Не обработанные"]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
});
export { SmallPreviews };
