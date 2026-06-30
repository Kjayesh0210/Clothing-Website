import { NavLink, useLocation } from "react-router-dom";

function DesktopNav() {
  const { search } = useLocation();
  const gender = new URLSearchParams(search).get("gender");

  const linkClass = (value) => `
    relative
    text-[15px]
    font-medium
    tracking-wide
    transition-all
    duration-300
    ${gender === value ? "text-black" : "text-neutral-600 hover:text-black"}
    after:absolute
    after:left-0
    after:-bottom-[8px]
    after:h-[2px]
    after:bg-black
    after:transition-all
    after:duration-300
    after:content-['']
    ${gender === value ? "after:w-full" : "after:w-0 hover:after:w-full"}
  `;

  return (
    <nav className="hidden lg:flex items-center gap-12">
      <NavLink
        to={{
          pathname: "/products",
          search: "?gender=Male",
        }}
        className={linkClass("Male")}
      >
        MEN
      </NavLink>

      <NavLink
        to={{
          pathname: "/products",
          search: "?gender=Female",
        }}
        className={linkClass("Female")}
      >
        WOMEN
      </NavLink>
    </nav>
  );
}

export default DesktopNav;
