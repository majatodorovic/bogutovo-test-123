"use client";
import { icons } from "@/_lib/icons";
import { Search } from "@/_components/shared/header/items/search";
import { useCartBadge, useWishlistBadge } from "@/_hooks";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ActionItems = () => {
  const { data: wishlist_badge } = useWishlistBadge();
  const { data: cart_badge } = useCartBadge();

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const checkLoggedInStatus = () => {
      const is_logged = localStorage.getItem("loggedIn");
      setIsLogged(is_logged === "true");
    };
    checkLoggedInStatus();

    const handleStorageChange = (event) => {
      if (event.key === "loggedIn") {
        checkLoggedInStatus();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div
      className={`flex items-center justify-end gap-5 md:max-w-[26.05rem] xl:max-w-[34rem] 2xl:max-w-[42.125rem] md:w-full`}
    >
      <Search className={`max-md:hidden`} />
      <div className={`flex items-center gap-3`}>
        <div className={`relative`}>
          <Link href={isLogged ? `/customer-profil` : `/nalog`}>
            {icons.user}
          </Link>
        </div>
        <div className={`relative`}>
          <Link href={`/lista-zelja`}>{icons.heart}</Link>
          {wishlist_badge > 0 && (
            <div
              className={`absolute -top-2 -right-1 bg-boa-red text-white w-4 h-4 rounded-full text-xs flex items-center justify-center`}
            >
              {wishlist_badge}
            </div>
          )}
        </div>
        <div className={`relative`}>
          <a href={`/korpa`}>{icons.bag}</a>
          {cart_badge > 0 && (
            <div
              className={`absolute -top-2 -right-1 bg-boa-red text-white w-4 h-4 rounded-full text-xs flex items-center justify-center`}
            >
              {cart_badge}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
