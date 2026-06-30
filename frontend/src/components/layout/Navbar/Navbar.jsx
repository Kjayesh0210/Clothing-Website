import { useContext, useEffect, useState } from "react";
import api from "../../../services/api";
import { CartContext } from "../../../context/CartContext";

import Logo from "./Logo";
import SearchBar from "./SearchBar";
import DesktopNav from "./DesktopNav";
import NavActions from "./NavActions";
import MobileMenu from "./MobileMenu";

function Navbar() {
  const { cartCount } = useContext(CartContext);

  const token = localStorage.getItem("token");

  const [menuOpen, setMenuOpen] = useState(false);

  const [keyword, setKeyword] = useState("");

  const [debouncedKeyword, setDebouncedKeyword] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [keyword]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchSuggestions = async () => {
      if (debouncedKeyword.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await api.get(
          `/products/search?keyword=${encodeURIComponent(debouncedKeyword)}`,
          {
            signal: controller.signal,
          },
        );

        setSuggestions(res.data);
      } catch (error) {
        if (error.name !== "CanceledError") {
          console.log(error);
        }
      }
    };

    fetchSuggestions();

    return () => controller.abort();
  }, [debouncedKeyword]);

  const searchProducts = (value) => {
    setKeyword(value);
  };

  return (
    <header
      className="
      sticky
      top-0
      z-50
      border-b
      border-neutral-200
      bg-white/90
      backdrop-blur-xl  
    "
    >
      <div className="mx-auto h-[72px] w-full px-10">
        {/* Mobile */}

        <div className="flex h-full items-center justify-between lg:hidden">
          <MobileMenu
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            token={token}
            cartCount={cartCount}
            keyword={keyword}
            searchProducts={searchProducts}
            suggestions={suggestions}
            setSuggestions={setSuggestions}
          />

          <Logo />

          <NavActions token={token} cartCount={cartCount} />
        </div>

        {/* Desktop */}

        <div
          className="
          hidden
          h-full
          lg:grid
          lg:grid-cols-[220px_1fr_auto]
          lg:items-center
          lg:gap-16
        "
        >
          {/* Logo */}
          <Logo />

          {/* Search */}

          <div className="flex justify-center">
            <SearchBar
              className="w-full max-w-[460px]"
              keyword={keyword}
              searchProducts={searchProducts}
              suggestions={suggestions}
              setSuggestions={setSuggestions}
            />
          </div>

          {/* Right */}

          <div className="flex items-center gap-24">
            <DesktopNav />
            <NavActions token={token} cartCount={cartCount} />
            <div></div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
