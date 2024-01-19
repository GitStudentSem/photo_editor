import styles from "./ImageItem.module.scss";
import { memo } from "react";

interface IImageItem {
	imageSrc: string; // должно быть преобразовано через createObjectUrl() при передаче в пропсы
	imageTitle: string;
	imageInfo: number | string;
}

export const ImageItem = memo(({ imageSrc, imageTitle, imageInfo }: IImageItem) => {
	// console.log(imageSrc, 'imageSrc');
	return (
		<div className={styles.imageItem}>
			<div className={styles.imageItem__wrapper}>
				<img src={imageSrc} alt="Фото" width={50} height={50} />
				<h5>{imageTitle.slice(0, 30)}...</h5>
				<h5>{imageInfo} Мб</h5>
			</div>
		</div>
	);
});