"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";
import Image from "next/image";
import { convertHttpToHttps } from "@/_helpers";
import { Thumb } from "@/_components/shared/thumb";
import { Suspense, useEffect, useState } from "react";
import { icons } from "@/_lib/icons";
import Link from "next/link";
import { SliderControls } from "@/_components/shared/slider-controls";
import { Layout } from "@/_components/ui/layout";
import { useIsMobile } from "@/_hooks";
import { pushToDataLayer } from "@/_services/data-layer";

export const Slider = ({
  images,
  children,
  title,
  items,
  id_product,
  slug_path,
  hoveredVariant,
  type,
  ...rest
}) => {
  const [swiper, setSwiper] = useState(null);
  const is_mobile = useIsMobile();
  const handleNext = () => {
    swiper.slideNext();
  };

  const handlePrev = () => {
    swiper.slidePrev();
  };

  const slideTo = (hoveredVariant) => {
    if (hoveredVariant) {
      let index = images?.findIndex((item) =>
        item?.url?.includes(hoveredVariant),
      );
      swiper?.slideTo(index);
    } else {
      swiper?.slideTo(0);
    }
  };

  useEffect(() => {
    if (hoveredVariant) {
      slideTo(hoveredVariant);
    }
  }, [hoveredVariant]);

  if (images && !children) {
    return (
      <Swiper
        modules={[Navigation]}
        {...rest}
        noSwiping={is_mobile}
        noSwipingClass={`no-swiping`}
        onInit={(swiper) => setSwiper(swiper)}
      >
        {(images ?? [])?.map(
          ({ descriptions: { alt }, file_data: { width, height }, url }, _) => {
            return (
              <SwiperSlide
                key={`image-${url}`}
                className={`!w-full !rounded-xl !h-auto no-swiping`}
              >
                <Link
                  href={`/${slug_path}`}
                  onClick={() => {
                    pushToDataLayer("view_item", rest?.data);
                  }}
                  className={`rounded-xl !w-full relative `}
                >
                  <Image
                    src={convertHttpToHttps(url)}
                    alt={alt ?? ""}
                    width={width ?? 0}
                    height={height ?? 0}
                    quality={80}
                    className={`rounded-xl !w-full !h-auto `}
                  />
                  <div
                    className={`absolute w-full h-full top-0 left-0 bg-black/40 invisible opacity-0 group-hover:visible group-hover:opacity-40 transition-all duration-300`}
                  />
                </Link>
              </SwiperSlide>
            );
          },
        )}
        {images?.length > 1 && (
          <div
            className={`absolute left-0 right-0 bottom-5 mx-auto w-fit flex gap-2 !z-[10] max-md:!visible md:invisible md:group-hover:visible`}
          >
            <button
              onClick={handlePrev}
              className={`p-1 rounded-full scale-75 border border-black hover:bg-boa-dark hover:text-white cursor-pointer focus:outline-0 focus:border-white focus:ring-2 focus:ring-boa-dark`}
            >
              {icons.chevron_left}
            </button>
            <button
              onClick={handleNext}
              className={`p-1 rounded-full scale-75 border border-black hover:bg-boa-dark hover:text-white cursor-pointer focus:outline-0 focus:border-white focus:ring-2 focus:ring-boa-dark`}
            >
              {icons.chevron_right}
            </button>
          </div>
        )}
      </Swiper>
    );
  } else {
    if (type === "products") {
      return (
        <>
          <div
            className={`flex items-center justify-between mb-[2rem] max-md:flex-col `}
          >
            {title && (
              <h3 className={`text-[1.563rem] font-semibold max-md:mr-auto`}>
                {title}
              </h3>
            )}
            {items?.length > swiper?.params?.slidesPerView && (
              <SliderControls handleNext={handleNext} handlePrev={handlePrev} />
            )}
          </div>
          <Swiper
            {...rest}
            onInit={(swiper) => setSwiper(swiper)}
            className={`!pb-[2rem] itemsSwiper`}
            modules={[Scrollbar]}
            allowSlideNext={true}
            allowSlidePrev={true}
            scrollbar={{
              draggable: true,
            }}
          >
            {(items ?? [])?.map(({ id }) => {
              return (
                <Suspense
                  key={`suspense-${id}`}
                  fallback={
                    <div
                      className={`aspect-2/3 w-full h-full bg-slate-200 animate-pulse`}
                    />
                  }
                >
                  <SwiperSlide key={`slide-${id}`} className={`!h-auto`}>
                    <Thumb id={id} category_id={"*"} key={`thumb-${id}`} />
                  </SwiperSlide>
                </Suspense>
              );
            })}
          </Swiper>
        </>
      );
    }
    if (type === "categories") {
      return (
        <>
          <Layout className={`mt-[2rem] md:mt-[6.125rem]`}>
            <div
              className={`flex items-center justify-between max-md:flex-col mb-[2rem]`}
            >
              {title && (
                <h3 className={`text-[1.563rem] font-semibold max-md:mr-auto`}>
                  {title}
                </h3>
              )}
              {items?.length > swiper?.params?.slidesPerView && (
                <SliderControls
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                />
              )}
            </div>
          </Layout>
          <Layout isAnchored={true}>
            <Swiper
              {...rest}
              onInit={(swiper) => setSwiper(swiper)}
              className={`!pb-[2rem] itemsSwiper`}
              modules={[Scrollbar]}
              scrollbar={{
                draggable: true,
              }}
            >
              {(items ?? [])?.map(
                ({
                  link: { link_path: slug_path },
                  basic_data: { name },
                  images: { image },
                  id,
                }) => {
                  return (
                    <SwiperSlide key={`slide-${id}`} className={`!h-auto`}>
                      <Link href={`/${slug_path}`} className={`group`}>
                        <div className={`relative w-full`}>
                          {image && (
                            <Image
                              src={convertHttpToHttps(image)}
                              alt={image}
                              width={0}
                              height={0}
                              sizes={`100vw`}
                              className={`!w-full rounded-xl`}
                            />
                          )}
                        </div>
                        <div
                          className={`bg-boa-red px-3 py-1 rounded-b-xl flex items-center justify-between absolute w-full left-0 bottom-0 right-0`}
                        >
                          <Image
                            src={`/images/boa-white.png`}
                            alt={`Bogutovo`}
                            width={50}
                            height={50}
                          />
                          <p
                            className={`text-white text-[1.463rem] font-semibold`}
                          >
                            {name}
                          </p>
                          <button
                            className={`p-1 rounded-full border scale-75 border-white text-white group-hover:bg-white group-hover:text-black cursor-pointer`}
                          >
                            {icons?.chevron_right}
                          </button>
                        </div>
                      </Link>
                    </SwiperSlide>
                  );
                },
              )}
            </Swiper>
          </Layout>
        </>
      );
    }
  }
};
