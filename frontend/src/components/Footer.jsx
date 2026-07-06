import { Link } from "react-router-dom";

function Footer() {
  const linkClass =
    "w-fit text-neutral-400 transition duration-300 hover:text-white";

  return (
    <footer className="mt-8 lg:mt-8 bg-[#111111] text-white">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 lg:px-[80px] lg:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-16">
          {/* Brand */}

          <div className="sm:col-span-2 lg:col-span-1">
            <h2 className="text-3xl font-black tracking-[0.18em] lg:text-4xl">
              THREADDOT
            </h2>

            <p className="mt-5 max-w-[380px] text-sm leading-7 text-neutral-400 sm:text-base">
              Premium fashion crafted for modern lifestyles. Timeless
              essentials, elevated everyday wear, and effortless style.
            </p>
          </div>

          {/* Shop */}

          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-neutral-500">
              Shop
            </h3>

            <ul className="space-y-3">
              <li>
                <Link to="/products" className={linkClass}>
                  New Arrivals
                </Link>
              </li>

              <li>
                <Link to="/products?gender=Male" className={linkClass}>
                  Men
                </Link>
              </li>

              <li>
                <Link to="/products?gender=Female" className={linkClass}>
                  Women
                </Link>
              </li>

              <li>
                <Link to="/products" className={linkClass}>
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}

          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-neutral-500">
              Support
            </h3>

            <ul className="space-y-3">
              <li className={linkClass}>Contact Us</li>
              <li className={linkClass}>Shipping</li>
              <li className={linkClass}>Returns</li>
              <li className={linkClass}>FAQ</li>
            </ul>
          </div>

          {/* Company */}

          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-neutral-500">
              Company
            </h3>

            <ul className="space-y-3">
              <li className={linkClass}>About Us</li>
              <li className={linkClass}>Careers</li>
              <li className={linkClass}>Privacy Policy</li>
              <li className={linkClass}>Terms & Conditions</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/10 pt-8 text-center md:mt-16 md:flex-row md:justify-between md:text-left">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} THREADDOT. All rights reserved.
          </p>

          <p className="text-sm text-neutral-500">
            Designed for Modern Fashion
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
