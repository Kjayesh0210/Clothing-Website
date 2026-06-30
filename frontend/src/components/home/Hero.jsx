import { Link } from "react-router-dom";

import HeroImage from "../../assets/hero/hero.png";

function Hero() {
  return (
    <section
      className="
    overflow-hidden
    bg-[#F7F4F2]
  "
    >
      <div
        className="
    mx-auto
    w-full
    max-w-[1440px]
    px-8
    lg:px-0
  "
      >
        <div
          className="
        grid
        h-[620px]
        lg:grid-cols-[8%_45%_47%]
      "
        >
          {/* LEFT */}

          <div
            className="
             col-start-2
            flex
            h-full
            items-center
            pl-16
            " 
          >
            <div
              className="
              flex
              flex-col
              w-[430px]
            "
            >
              {/* Badge */}

              <span
                className="
    inline-flex
    w-fit
    items-center
    rounded-full
    bg-[#EFE4DC]
    px-5
    py-2
    text-[12px]
    font-medium
    uppercase
    tracking-[0.18em]
    text-[#665C56]
  "
              >
                New Arrival
              </span>

              {/* Heading */}

              <h1
                className="
                mt-8
                font-inter
                text-[72px]
                font-extrabold
                leading-[76px]
                tracking-[-0.04em]
                text-[#1A1A1A]
                "
              >
                WEAR
                <br />
                YOUR
                <br />
                STORY
              </h1>

              {/* Description */}

              <p
                className="
                mt-8
                max-w-[360px]
                text-[18px]
                font-normal
                leading-[30px]
                text-[#6B6B6B]
                "
              >
                Premium oversized essentials designed for comfort and
                confidence.
              </p>

              {/* Button */}
              <div className="h-10"></div>
              <div>
                <Link
                  to="/products"
                  className="
                  inline-flex
                  h-[56px]
                  w-[180px]
                  items-center
                  justify-center
                  rounded-full
                  bg-[#1E1E1E]
                  text-[15px]
                  font-semibold
                  tracking-[0.08em]
                  text-white
                  transition-all
                  duration-300
                  hover:scale-[1.03]
                  hover:bg-black
                "
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div
            className="
             col-start-3
    relative
    flex
    h-[620px]
    w-[768px]
    items-end
    justify-center
    overflow-hidden
  "
          >
            <img
              src={HeroImage}
              alt="Hero Model"
              className="
      h-full
      w-full
      object-cover
    "
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
