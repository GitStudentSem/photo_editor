import { FlipCard } from "../Flip/components/FlipCard/FlipCard";
import { RotateCard } from "../Rotate/RotateCard";
import { NegativeCard } from "../Negative/components/NegativeCard/NegativeCard";
import s from "./mainPage.module.css";

export const MainPage = () => {
	return (
		<div className={s.wrapper}>
			<FlipCard />
			<NegativeCard />
			<RotateCard />
		</div>
	);
};
