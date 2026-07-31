import { Link } from "react-router-dom";
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
      {/* <img src={THREADDOT3} alt="" className="h-12 w-auto" /> */}
      <h1 className="text-2xl font-bold">THREADDOT</h1>
    </Link>
  );
}

export default Logo;
