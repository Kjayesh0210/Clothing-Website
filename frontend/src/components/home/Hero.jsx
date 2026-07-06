import { Link } from "react-router-dom";

import HeroImage from "../../assets/hero/Hero.png";
import MobileHero from "../../assets/hero/MobileHero.png";

function Hero() {
  return (
    <section className="overflow-hidden bg-[#F7F4F2]">
      <div className="w-full">
        <div className="relative grid min-h-[620px] items-center lg:grid-cols-[8%_45%_47%]">
          {/* LEFT */}
          {/* Mobile Background */}
          <div className="absolute inset-0 lg:hidden">
            <img
              src={MobileHero}
              alt="Hero Model"
              className="h-full w-full object-cover"
              draggable={false}
            />

            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative z-10 flex items-center px-4 py-12 lg:col-start-2 lg:h-[620px] lg:py-0 lg:px-0 lg:pl-16">
            <div className="flex w-full max-w-[430px] flex-col">
              {/* Badge */}

              <span
                className="
                inline-flex
                w-fit
                items-center
                rounded-full
                bg-white/20
                backdrop-blur-sm
                px-5
                py-2
                text-[11px]
                sm:text-[12px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-white
                lg:bg-[#EFE4DC]
                lg:text-[#665C56]
                "
              >
                New Arrival
              </span>

              {/* Heading */}

              <h1
                className="
                  mt-6
                  font-inter
                  text-5xl
                  font-extrabold
                  leading-none
                  tracking-[-0.04em]
                  text-white
                  lg:text-[#1A1A1A]
                  sm:text-6xl
                  lg:mt-8
                  lg:text-[72px]
                  lg:leading-[76px]
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
                  mt-6
                  max-w-[360px]
                  text-base
                  leading-7
                  text-gray-200
                  sm:text-[18px]
                  sm:leading-[30px]
                  lg:text-[#6B6B6B]
                  lg:mt-8
                "
              >
                Premium oversized essentials designed for comfort and
                confidence.
              </p>

              {/* Button */}

              <div className="mt-10">
                <Link
                  to="/products"
                  className="
                    inline-flex
                    h-14
                    w-[180px]
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-[15px]
                    font-semibold
                    tracking-[0.08em]
                    text-black
                    transition-all
                    duration-300
                    hover:scale-[1.03]
                    hover:bg-gray-100
                    lg:bg-[#1E1E1E]
                    lg:text-white
                    lg:hover:bg-black
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
            hidden
            relative
            lg:flex
            lg:col-start-3
            lg:h-[620px]
            lg:w-full
            items-end
            justify-center
            overflow-hidden
            "
          >
            <img
              src={HeroImage}
              alt="Hero Model"
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
