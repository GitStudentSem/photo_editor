import styles from "./FlipCard.module.css";
import { Link } from "react-router-dom";

export const FlipCard = () => {
	return (
		<Link to='/flip' className={styles.link}>
			<div className={styles.card}>
				<div className={styles.card__wrapper}>
					<div className={styles.card__text}>Flip</div>
				</div>
			</div>
		</Link>
	);
};
