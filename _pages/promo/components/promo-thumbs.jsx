"use client";

import { useLandingPagesThumb } from "@/_hooks";
import Image from "next/image";
import { convertHttpToHttps } from "@/_helpers";
import Link from "next/link";
import { Button } from "@/_components/shared/button";

export const PromoThumbs = ({ slug }) => {
  const { data: thumb } = useLandingPagesThumb({ slug });

  if (!thumb) return null;

  return (
    thumb?.items?.length > 0 && (
      <div className={`my-12`}>
        <h3 className={`text-[1.823rem] font-bold my-5 max-sm:leading-[100%]`}>
          Za više informacija
        </h3>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5`}
        >
          {(thumb?.items ?? [])?.map(
            ({ name, id, description, url, button, thumb_image }) => {
              return (
                <div
                  key={`promo-thumb-${id}`}
                  className={`col-span-1 shadow-md group hover:scale-105 transition-all duration-300 rounded-lg`}
                >
                  <Link
                    href={`/${url ?? "stranica-u-izradi"}`}
                    target={`_blank`}
                  >
                    <Image
                      src={convertHttpToHttps(thumb_image ?? "")}
                      alt={name ?? "Bogutovo"}
                      width={0}
                      height={0}
                      sizes={`100vw`}
                      className={`w-full`}
                    />
                    <p
                      className={`text-xl font-semibold mt-3 px-2 group-hover:text-boa-red transition-all duration-300`}
                    >
                      {name}
                    </p>
                    <p className={`px-2 mt-1.5`}>{description}</p>
                    <div className={`p-2`}>
                      <Button variant={`primary`} className={`!py-2 w-full`}>
                        {button}
                      </Button>
                    </div>
                  </Link>
                </div>
              );
            },
          )}
        </div>
      </div>
    )
  );
};
