"use client";

import { useAddToCart, useProduct, useProductGallery } from "@/_hooks";
import { ProductWishlist, Variants } from "@/_dynamic_pages";
import {
  checkIsInStock,
  checkPrices,
  Prices,
} from "@/_components/shared/prices";
import { Suspense, useEffect, useState } from "react";
import { convertDate } from "@/_helpers";
import { useRouter } from "next/navigation";
import { Button } from "@/_components/shared/button";
import Image from "next/image";
import { pushToDataLayer } from "@/_services/data-layer";
import { generateProductSchema } from "@/_functions";

export const BasicData = ({ slug, id, canonical }) => {
  const { data } = useProduct({ slug: id });
  const { data: gallery } = useProductGallery({ slug: id });

  if (data) {
    const {
      data: {
        item: {
          basic_data: { name, sku, id_product },
          inventory,
          price,
        },
        variant_items,
        variant_options,
      },
      product_type,
    } = data;
    const { push } = useRouter();

    const [productVariant, setProductVariant] = useState();
    const [newURL, setNewURL] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState(null);
    const [tempError, setTempError] = useState(null);

    useEffect(() => {
      if (newURL) {
        window.history.replaceState({}, "", newURL);
        setTempError(null);
      }
    }, [newURL, productVariant]);

    useEffect(() => {
      let viewed_products = localStorage?.getItem("viewed_products");

      if (viewed_products) {
        let viewed_products_array = JSON?.parse(viewed_products);
        let viewed_products_ids = (viewed_products_array ?? [])?.map(
          (product) => product?.id,
        );

        if (!viewed_products_ids?.includes(id_product)) {
          viewed_products_array?.push({ id: id_product });
          localStorage?.setItem(
            "viewed_products",
            JSON?.stringify(viewed_products_array),
          );
        }
      } else {
        localStorage?.setItem(
          "viewed_products",
          JSON?.stringify([{ id: id_product }]),
        );
      }
    }, []);

    const handleURLChange = (url) => {
      setNewURL(url);
    };

    const updateProductVariant = (variant) => {
      setProductVariant({
        ...variant,
        price: {
          ...variant?.price,
          min: [],
          max: [],
        },
      });
    };

    const checkSelectedOptions = (options) => {
      let text = "";
      if (options && product_type === "variant") {
        let options_length = variant_options?.length;
        let selected_options_length = options?.length;

        if (options_length !== selected_options_length) {
          let not_selected_attributes = [];

          let selected_attributes = (options ?? [])?.map(
            ({ attribute_key }) => attribute_key,
          );

          (variant_options ?? [])?.forEach((option) => {
            if (!selected_attributes?.includes(option?.attribute?.key)) {
              not_selected_attributes.push(option?.attribute?.name);
            }
          });

          not_selected_attributes = (not_selected_attributes ?? [])?.map(
            (attribute) => {
              if (attribute?.[attribute?.length - 1] === "a") {
                return attribute?.slice(0, -1)?.toLowerCase() + "u";
              } else {
                return attribute;
              }
            },
          );

          switch (not_selected_attributes?.length) {
            case 1:
              text = `Odaberite ${not_selected_attributes?.[0]}`;
              break;
            case 2:
              text = `Odaberite ${not_selected_attributes?.[0]} i ${not_selected_attributes?.[1]}`;
              break;
          }
        }
      }
      return text;
    };

    const { mutate: addToCart, isPending: is_adding_to_cart } = useAddToCart();

    const checkIsAddable = (price, inventory) => {
      let addable_data = {};

      let is_in_stock = checkIsInStock(inventory);
      let { price_defined } = checkPrices(price);

      if (is_in_stock && price_defined) {
        addable_data.addable = true;
        addable_data.text = "Dodajte u korpu";
      } else {
        addable_data.addable = false;
        addable_data.text = "Pošaljite upit";
      }
      return addable_data;
    };

    const handleAddToCart = () => {
      switch (product_type) {
        case "single":
          let is_addable = checkIsAddable(
            productVariant?.id ? productVariant?.price : price,
            productVariant?.id ? productVariant?.inventory : inventory,
          );
          if (is_addable?.addable) {
            pushToDataLayer("add_to_cart", data?.data?.item);
            addToCart({
              id: id_product,
              quantity: 1,
            });
          } else {
            push(`/kontakt?slug=${slug}`);
          }
          break;
        case "variant":
          if (productVariant?.id) {
            let is_addable = checkIsAddable(
              productVariant?.id ? productVariant?.price : price,
              productVariant?.id ? productVariant?.inventory : inventory,
            );

            if (is_addable?.addable) {
              pushToDataLayer("add_to_cart", productVariant);
              addToCart({
                id: productVariant?.id,
                quantity: 1,
              });
            } else {
              push(`/kontakt?slug=${productVariant?.slug}`);
            }
          } else {
            let text = checkSelectedOptions(selectedOptions);
            setTempError(text);
          }
          break;
        default:
          break;
      }
    };

    const product_schema = generateProductSchema(data, gallery, canonical);

    return (
      <div className={`mt-[1.5rem]`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(product_schema) }}
        />
        <p className={`text-[0.788rem] text-[#636363]`}>Šifra artikla: {sku}</p>
        <div className={`flex mt-5 items-center justify-between`}>
          <h1 className={`text-[1.563rem] font-bold`}>{name}</h1>
          <ProductWishlist id_product={id_product} product={data?.data?.item} />
        </div>
        {checkIsAddable(
          productVariant?.id ? productVariant?.price : price,
          productVariant?.id ? productVariant?.inventory : inventory,
        ).addable ? (
          <li className="text-green-500">Na stanju</li>
        ) : (
          <li className="text-red-600">Trenutno nije na stanju</li>
        )}
        <div className={`mt-5 flex items-end justify-between`}>
          <div className={`flex flex-col gap-1`}>
            <Prices
              type={`details`}
              price={productVariant?.id ? productVariant?.price : price}
              inventory={
                productVariant?.id ? productVariant?.inventory : inventory
              }
            />
          </div>
          {price?.discount?.active && (
            <p className={`text-[0.875rem] text-[#636363]`}>
              Akcijska cena važi od{" "}
              {convertDate(price?.discount?.campaigns?.[0]?.duration?.from)} do{" "}
              {convertDate(price?.discount?.campaigns?.[0]?.duration?.to)}
            </p>
          )}
        </div>
        {product_type === "variant" && (
          <div className={`mt-5`}>
            <Suspense>
              <Variants
                setSelectedOptions={setSelectedOptions}
                slug={slug}
                product={data}
                productSlug={slug}
                handleURLChange={handleURLChange}
                updateProductVariant={updateProductVariant}
                productVariant={productVariant}
              />
            </Suspense>
          </div>
        )}
        <Button
          variant={`secondary`}
          disabled={is_adding_to_cart}
          onClick={handleAddToCart}
          className={`!w-full mt-10 ${tempError ? "bg-boa-red" : ""}`}
        >
          {is_adding_to_cart
            ? "Dodajem..."
            : tempError
              ? tempError
              : checkIsAddable(
                  productVariant?.id ? productVariant?.price : price,
                  productVariant?.id ? productVariant?.inventory : inventory,
                )?.text}
        </Button>
        <div
          className={`mt-5 flex flex-col md:flex-row md:items-center gap-5 md:gap-10`}
        >
          <div className={`flex items-center gap-3`}>
            <Image
              src={`/icons/delivery/package.png`}
              alt={`Bogutovo dostava`}
              width={40}
              height={30}
              quality={100}
            />
            <p className={`leading-[100%]`}>
              Besplatna dostava
              <br />
              preko 4.000 RSD
            </p>
          </div>
          <div className={`flex items-center gap-3`}>
            <Image
              src={`/icons/delivery/calendar.png`}
              alt={`Bogutovo dostava`}
              width={40}
              height={30}
              quality={100}
            />
            <p className={`leading-[100%]`}>
              2-5 radnih dana
              <br />
              isporuka
            </p>
          </div>
          <div className={`flex items-center gap-3`}>
            <Image
              src={`/icons/delivery/delivery.png`}
              alt={`Bogutovo dostava`}
              width={40}
              height={30}
              quality={100}
            />
            <p className={`leading-[100%]`}>
              Povrat do
              <br />
              14 dana
            </p>
          </div>
        </div>
      </div>
    );
  }
};
