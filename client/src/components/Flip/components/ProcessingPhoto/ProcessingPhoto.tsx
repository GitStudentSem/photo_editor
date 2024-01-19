import styles from "./ProcessingPhoto.module.scss";
import { PhotoStore } from "../../store/store";
import { observer } from "mobx-react-lite";
import { MouseEvent, useRef } from "react";

const ProcessingPhoto = observer(() => {
	const { photo, processedPhoto } = PhotoStore;
	const rangeRef = useRef(null);
	const resizeRef = useRef(null);
	const beforeWrapperRef = useRef(null);
	const afterWrapperRef = useRef(null);
	// const rangeInputRef = useRef(null);


	function onMouseMove(e: MouseEvent<HTMLDivElement>) {
		const sizeImage = afterWrapperRef.current.offsetWidth;
		const rect = e.target.getBoundingClientRect();
		rangeRef.current.style.right = e.clientX + 'px';
		console.log(sizeImage, 'width');
		afterWrapperRef.current.style.right = rect.x + 'px';
		console.log(rect, 'rect');

		// if (rect.x >= sizeImage) {
		// 	rangeRef.current.style.left = rect.x + 'px';
		// }
	}

	function onMouseLeave() {
		// resizeRef.current.style.left = "50%";
	}

	return (
		<div className={styles.photo}
		>
			<div className={processedPhoto ? styles.before_processed : styles.before} ref={beforeWrapperRef}>
				{photo && <img src={URL.createObjectURL(photo[0])} alt="" className={styles.before__img} />}
			</div>
			<span className={processedPhoto ? styles.resize : styles.resize_notProcessed} ref={resizeRef}></span>
			<div className={styles.after} ref={afterWrapperRef}>
				{/* {processedPhoto && <img src={URL.createObjectURL(processedPhoto[0])} alt="" className={styles.after__img} />} */}
				{processedPhoto && <img src={'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg'} alt="" className={styles.after__img} />}
			</div>
			<div className={styles.range} ref={rangeRef} onMouseMove={processedPhoto ? e => onMouseMove(e) : null}
				onMouseLeave={processedPhoto ? onMouseLeave : null}></div>
		</div >
	);
});

export default ProcessingPhoto;