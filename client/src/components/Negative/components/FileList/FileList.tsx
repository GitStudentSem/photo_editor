import styles from "./FileList.module.scss";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import ProcessedTab from "./Tabs/ProcessedTab";
import UnprocessedTab from "./Tabs/UnprocessedTab";

const FileList = observer(() => {
  console.log("render");

  const [activeTab, setActiveTab] = useState<"Необработанные" | "Обработанные">(
    "Необработанные"
  );

  const tabs = {
    Обработанные: <ProcessedTab />,
    Необработанные: <UnprocessedTab />,
  };

  return (
    <div className={styles.fileList}>
      <div className={styles.tabs}>
        <div className={styles.tabs__wrapper}>
          <div
            className={
              activeTab === "Необработанные"
                ? styles.tabs__item_active
                : styles.tabs__item
            }
            onClick={() => setActiveTab("Необработанные")}
          >
            <h4>Необработанные</h4>
          </div>
          <div
            className={
              activeTab === "Обработанные"
                ? styles.tabs__item_active
                : styles.tabs__item
            }
            onClick={() => setActiveTab("Обработанные")}
          >
            <h4>Обработанные</h4>
          </div>
        </div>
      </div>
      <div className={styles.fileList__wrapper}>{tabs[activeTab]}</div>
    </div>
  );
});

export default FileList;
