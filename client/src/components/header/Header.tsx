import s from "./header.module.css";
import arrowLeft from "../../icons/arrowLeft.svg";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className={s.header}>
      <Link to='/' className={s.back_location_wrapper}>
        <img src={arrowLeft} alt='' />
        <p>Назад</p>
      </Link>
    </div>
  );
};
export { Header };
