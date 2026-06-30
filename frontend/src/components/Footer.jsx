import { Link } from "react-router-dom";

function Footer() {
  const linkClass =
    "text-neutral-400 transition duration-300 hover:text-white w-fit";

  return (
    <footer className="mt-24 bg-[#111111] text-white">
      <div className="h-10"></div>
      <div className="mx-auto w-full max-w-[1440px] px-[80px] py-20">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Brand */}

          <div>
            <h2 className="text-4xl font-black tracking-[0.18em]">THREADDOT</h2>

            <p className="text-neutral-400">
              Premium fashion crafted for modern lifestyles. Timeless
              essentials, elevated everyday wear, and effortless style.
            </p>

            {/* <div className="mt-8 flex items-center gap-5">
              <Instagram
                size={22}
                className="cursor-pointer text-neutral-400 transition hover:text-white"
                />
                
                <Twitter
                size={22}
                className="cursor-pointer text-neutral-400 transition hover:text-white"
                />
                
                <Linkedin
                size={22}
                className="cursor-pointer text-neutral-400 transition hover:text-white"
                />
                </div> */}
          </div>

          {/* Shop */}

          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-neutral-500">
              Shop
            </h3>

            <ul className="space-y-4">
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
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-neutral-500">
              Support
            </h3>

            <ul className="space-y-4">
              <li className={linkClass}>Contact Us</li>

              <li className={linkClass}>Shipping</li>

              <li className={linkClass}>Returns</li>

              <li className={linkClass}>FAQ</li>
            </ul>
          </div>

          {/* Company */}

          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-neutral-500">
              Company
            </h3>

            <ul className="space-y-4">
              <li>About Us</li>

              <li>Careers</li>

              <li>Privacy Policy</li>

              <li>Terms & Conditions</li>
            </ul>
          </div>
        </div>

        <div className="h-10"></div>
        {/* Bottom */}

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
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
