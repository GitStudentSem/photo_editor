import { FlipCard } from "../Flip/components/FlipCard/FlipCard";
import { RotateCard } from "../Rotate/rotateCard/RotateCard";
import { NegativeCard } from "../Negative/NegativeCard/NegativeCard";
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
