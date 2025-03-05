"use client";

import { icons } from "@/_lib/icons";
import {
  useAddToWishlist,
  useIsInWishlist,
  useRemoveFromWishlist,
} from "@/_hooks";
import { useEffect } from "react";
import { pushToDataLayer } from "@/_services/data-layer";

export const ProductWishlist = ({ product, id_product }) => {
  const { data: is_in_wishlist, refetch: refetchWishlist } = useIsInWishlist({
    id: id_product,
  });
  const {
    mutate: addToWishlist,
    isPending: is_adding_to_wishlist,
    isSuccess: is_added_to_wishlist,
  } = useAddToWishlist();
  const {
    mutate: removeFromWishlist,
    isPending: is_removing_from_wishlist,
    isSuccess: is_removed_from_wishlist,
  } = useRemoveFromWishlist();

  useEffect(() => {
    if (is_added_to_wishlist || is_removed_from_wishlist) {
      refetchWishlist();
    }
  }, [is_added_to_wishlist, is_removed_from_wishlist]);

  return (
    <>
      {is_in_wishlist?.exist ? (
        <span
          onClick={() => {
            removeFromWishlist({ id: is_in_wishlist?.wishlist_item_id });
            pushToDataLayer("remove_from_wishlist", product);
          }}
          className={`hover:text-boa-red cursor-pointer`}
        >
          {icons.heart_active}
        </span>
      ) : (
        <span
          onClick={() => {
            addToWishlist({ id: id_product });
            pushToDataLayer("add_to_wishlist", product);
          }}
          className={`hover:text-boa-red cursor-pointer`}
        >
          {icons.heart}
        </span>
      )}
    </>
  );
};
