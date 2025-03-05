"use client";

import {
  findColorAndCreateObject,
  findVariantProduct,
} from "@/_components/shared/thumb";
import Image from "next/image";
import { convertHttpToHttps } from "@/_helpers";
import { useState } from "react";
import { useProduct } from "@/_hooks";
import { toast } from "react-toastify";

export const ThumbVariants = ({ variant_options, product_type, slug }) => {
  let color = findColorAndCreateObject(variant_options);
  const [values, setValues] = useState(color?.values?.slice(0, 3) ?? []);

  const { data } = useProduct({ slug });

  if (data?.data?.variant_items) {
    if (color && product_type === "variant") {
      return (
        <div
          className={`flex items-center gap-1 relative w-fit`}
          onMouseEnter={() => {
            setValues(color?.values ?? []);
          }}
          onMouseLeave={() => {
            setValues(color?.values?.slice(0, 3) ?? []);
          }}
        >
          {(values ?? []).map(({ key, image, slug }) => {
            return (
              <div
                // onMouseEnter={() => {
                //   setHoveredVariant(`${slug}`);
                // }}
                // onClick={() => {
                //   if (product) {
                //     addToCart({
                //       id: product?.basic_data?.id_product,
                //       quantity: 1,
                //     });
                //   } else {
                //     toast.error("Proizvod nije dostupan.", {
                //       position: "top-center",
                //       autoClose: 2000,
                //     });
                //   }
                // }}
                className={`overflow-hidden rounded-full border`}
                key={`variant-${key}`}
              >
                <Image
                  src={convertHttpToHttps(image ?? "")}
                  alt={key ?? "Bogutovo"}
                  width={20}
                  height={20}
                  className={`rounded-full w-[0.675rem] h-[0.675rem] !object-cover scale-[400%] `}
                />
              </div>
            );
          })}
          {color?.values?.length > 3 && values?.length <= 3 && (
            <p className={`absolute -right-6 text-sm`}>
              +{color?.values?.length - 3}
            </p>
          )}
        </div>
      );
    }
  }

  return null;
};
