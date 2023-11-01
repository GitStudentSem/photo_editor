import { FlipCard } from "../Flip/FlipCard";
import { RotateCard } from "../Rotate/RotateCard";
import { NegativeCard } from "../Negative/NegativeCard";

export const MainPage = () => {
  return (
    <div>
      <FlipCard />
      <NegativeCard />
      <RotateCard />
    </div>
  );
};
