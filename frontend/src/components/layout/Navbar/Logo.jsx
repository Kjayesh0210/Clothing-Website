import { Link } from "react-router-dom";

function Logo() {
  return (
    <div className="flex">
      <div className="w-10"></div>
      <Link
        to="/"
        className="
      shrink-0
      select-none
      text-[26px]
      font-black
      uppercase
      tracking-[0.12em]
      text-neutral-900
      "
      >
        THREADDOT
      </Link>
    </div>
  );
}

export default Logo;
