import { checkIsInStock, checkPrices } from "@/_components/shared/prices";
import { toast } from "react-toastify";

export const findColorAndCreateObject = (variant_options) => {
  const colorOption = variant_options?.find(
    (opt) => opt?.attribute?.name === "Boja"
  );

  if (!colorOption) {
    return null; // or handle the case where no matching color option is found
  }

  return {
    attribute: colorOption.attribute,
    values: colorOption.values,
  };
};

export const findVariantProduct = (variant_items = [], selected = "") => {
  let product = variant_items?.find(({ variant_key }) => {
    return variant_key === selected;
  });

  if (product) {
    let is_in_stock = checkIsInStock(product?.inventory);
    let { price_defined } = checkPrices(product?.price);

    if (is_in_stock && price_defined) {
      return product;
    }
  }
};
