import Tab from "../Tab/Tab";
import styles from "./TabPanel.module.scss";

interface ITabPanel {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: number) => void;
}

const TabPanel = ({ tabs, activeTab, setActiveTab }: ITabPanel) => {
  return (
    <div className={styles.tabPanel}>
      <div className={styles.tabPanel__wrapper}>
        {tabs &&
          tabs.map((tab, index) => {
            return (
              <Tab
                key={tab}
                value={tab}
                activeTab={activeTab}
                onClick={() => setActiveTab(index)}
              />
            );
          })}
      </div>
    </div>
  );
};

export default TabPanel;
