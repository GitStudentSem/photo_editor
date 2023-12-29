import styles from "./NegativePage.module.css";
import Settings from "./components/Settings/Settings";
import ProcessingPhoto from "./components/ProcessingPhoto/ProcessingPhoto";
import FileList from "./components/FileList/FileList";

export const NegativePage = () => {
    return (
      <div className={styles.negativePage}>
        <ProcessingPhoto />
        <FileList />
        <Settings />
      </div>
    );
  }
;
