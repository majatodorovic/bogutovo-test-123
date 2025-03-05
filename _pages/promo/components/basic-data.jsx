"use client";

import { Breadcrumbs } from "@/_components/shared/breadcrumbs";
import Image from "next/image";
import { convertHttpToHttps } from "@/_helpers";
import { useLandingPagesBasicData } from "@/_hooks";
import { notFound } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css/autoplay";

export const PromoBasicData = ({ slug }) => {
  const { data: basic_data } = useLandingPagesBasicData({ slug });

  if (basic_data) {
    const { name, image, description, gallery } = basic_data;

    let all_images = [];

    if (image) {
      all_images?.push(image);
    }

    if (gallery?.length > 0) {
      (gallery ?? [])?.map(({ image }) => {
        all_images?.push(image);
      });
    }

    return (
      <>
        <div className={`ml-auto flex justify-start md:justify-end mt-5`}>
          <Breadcrumbs
            name={`${name}`}
            parents={[
              {
                slug_path: null,
                name: "Promocije",
              },
            ]}
          />
        </div>
        <h1 className={`text-[1.823rem] font-bold my-5`}>{name}</h1>
        {description && (
          <p
            className={`my-[1.125rem] font-normal text-[1.05rem] w-full`}
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
        )}
        {!!all_images && (
          <Swiper
            slidesPerView={1}
            className={`!w-full`}
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
          >
            {(all_images ?? [])?.map((image, index) => {
              return (
                <SwiperSlide key={`image-${index}`} className={`w-full`}>
                  <Image
                    src={convertHttpToHttps(image)}
                    alt={name ?? "Bogutovo"}
                    width={0}
                    height={0}
                    sizes={`100vw`}
                    className={`w-full`}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </>
    );
  } else {
    return notFound();
  }
};
