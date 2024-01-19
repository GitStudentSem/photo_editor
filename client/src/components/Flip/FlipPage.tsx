import styles from "./FlipPage.module.css";
import Settings from "./components/Settings/Settings";
import ProcessingPhoto from "./components/ProcessingPhoto/ProcessingPhoto";
import FileList from "./components/FileList/FileList";

export const FlipPage = () => {
	return (
		<div className={styles.flipPage}>
			<ProcessingPhoto />
			<FileList />
			<Settings />
		</div>
	);
}
	;
