import { FlipCard } from "../Flip/FlipCard";
import { RotateCard } from "../Rotate/RotateCard";
import { MirrorCard } from "../Mirror/MirrorCard";

export const MainPage = () => {
  return (
    <div>
      <FlipCard />
      <MirrorCard />
      <RotateCard />
    </div>
  );
};
