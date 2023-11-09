import { Link } from "react-router-dom";
import s from "./rotateCard.module.css";

export const RotateCard = () => {
  return (
    <Link className={s.wrapper} to='/rotate'>
      <span className={s.text}>Rotate</span>
    </Link>
  );
};
