import styles from "./Tab.module.scss";

type TypeTab = {
  value: string;
  activeTab: string;
  onClick: () => void;
};

const Tab = ({ value, activeTab, onClick }: TypeTab) => {
  return (
    <div
      className={activeTab === value ? styles.tab_active : styles.tab}
      onClick={onClick}
    >
      <div className={styles.tab__wrapper}>
        <p className={styles.tab__text}>{value}</p>
      </div>
    </div>
  );
};

export default Tab;
