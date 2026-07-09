import { Link } from "react-router-dom";
import THREADDOT from "./../../../assets/photos/THREADDOT.png";
import THREADDOT2 from "./../../../assets/photos/THREADDOTLOGO.png";
import THREADDOT3 from "./../../../assets/photos/3.png";
function Logo() {
  return (
    <Link
      to="/"
      className="
      shrink-0
      select-none
      "
    >
      <img src={THREADDOT3} alt="" className="h-12 w-auto" />
    </Link>
  );
}

export default Logo;
