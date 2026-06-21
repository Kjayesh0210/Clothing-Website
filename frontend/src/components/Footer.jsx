function Footer() {
  return (
    <footer
      className="
      bg-black
      text-white
      mt-20
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-4
        py-10
        "
      >
        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-4
          gap-8
          "
        >
          <div>
            <h2 className="text-xl font-bold mb-3">CLOTHIFY</h2>

            <p className="text-gray-400">
              Premium fashion for modern lifestyles.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Shop</h3>

            <ul className="space-y-2">
              <li>New Arrivals</li>
              <li>Men</li>
              <li>Women</li>
              <li>Sale</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Support</h3>

            <ul className="space-y-2">
              <li>Contact Us</li>
              <li>Shipping</li>
              <li>Returns</li>
              <li>FAQ</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Legal</h3>

            <ul className="space-y-2">
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
        </div>

        <div
          className="
          border-t
          border-gray-700
          mt-8
          pt-5
          text-center
          text-gray-400
          "
        >
          © {new Date().getFullYear()} CLOTHIFY. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
