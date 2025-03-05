"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import "swiper/css/zoom";
import { FreeMode, Pagination, Thumbs, Zoom } from "swiper/modules";
import Image from "next/image";
import { convertHttpToHttps } from "@/_helpers";
import { useSearchParams } from "next/navigation";
import { useProduct, useProductGallery } from "@/_hooks";
import { icons } from "@/_lib/icons";
import { DiscountStickers } from "@/_components/shared/prices";

export const Gallery = ({ slug }) => {
  const [loading, setLoading] = useState(false);
  const { data: productGallery } = useProductGallery({ slug });
  const { data: product } = useProduct({ slug });
  const [gallery, setGallery] = useState(productGallery);

  const params = useSearchParams();
  const color = params?.get("color");

  function ImageMagnifier({
    src,
    width,
    height,
    alt,
    magnifierHeight = 300,
    magnifierWidth = 300,
    zoomLevel = 2.5,
    onClick = () => {},
  }) {
    const [[x, y], setXY] = useState([0, 0]);

    const [[imgWidth, imgHeight], setSize] = useState([0, 0]);

    const [showMagnifier, setShowMagnifier] = useState(false);

    return (
      <div
        style={{
          position: "relative",
          zIndex: 100,
        }}
        className="h-full w-full object-cover"
        onClick={onClick}
      >
        <Image
          src={src}
          width={0}
          height={0}
          sizes={`(max-width: 768px) 100vw, (min-width: 1200px) 70vw`}
          priority={true}
          className="!h-full !object-cover w-full"
          onMouseEnter={(e) => {
            const elem = e.currentTarget;
            const { width, height } = elem.getBoundingClientRect();
            setSize([width, height]);
            setShowMagnifier(true);
          }}
          onMouseMove={(e) => {
            const elem = e.currentTarget;
            const { top, left } = elem.getBoundingClientRect();
            const x = e.pageX - left - window.pageXOffset;
            const y = e.pageY - top - window.pageYOffset;
            setXY([x, y]);
          }}
          onMouseLeave={() => {
            setShowMagnifier(false);
          }}
          alt={`${alt ?? "Bogutovo"}`}
        />

        <div
          style={{
            display: showMagnifier ? "" : "none",
            position: "absolute",
            pointerEvents: "none",
            height: `${magnifierHeight}px`,
            width: `${magnifierWidth}px`,
            top: `${y - magnifierHeight / 2}px`,
            left: `${x - magnifierWidth / 2}px`,
            opacity: "1",
            border: "1px solid lightgray",
            borderRadius: "50%",
            backgroundColor: "white",
            backgroundImage: `url('${src}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${imgWidth * zoomLevel}px ${
              imgHeight * zoomLevel
            }px`,
            backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
            backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
          }}
        ></div>
      </div>
    );
  }

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  const filterOutVariantImages = (gallery) => {
    let filtered = [];
    let ids = [];
    for (let i = 0; i < gallery.length; i++) {
      if (!ids.includes(gallery[i]?.id_product_parent)) {
        ids?.push(gallery[i]?.id_product_parent);
        filtered?.push(gallery[i]);
      }
    }
    return filtered;
  };

  const filtered_images = filterOutVariantImages(gallery ?? []);

  const productImage = gallery?.map((image, index) => {
    return (
      <SwiperSlide key={index} className="w-full relative">
        <ImageMagnifier
          src={convertHttpToHttps(image?.image)}
          alt={image?.image_data?.descriptions?.alt ?? "Bogutovo"}
          width={0}
          height={0}
          onClick={() => {
            setModalImage(image?.image);
          }}
        />
      </SwiperSlide>
    );
  });

  const thumbImage = gallery?.map((image, index) => {
    return (
      <SwiperSlide key={index} className={`!overflow-hidden !aspect-square`}>
        <Image
          src={convertHttpToHttps(image?.image)}
          alt={`${image?.image_data?.descriptions?.alt ?? "Bogutovo"}`}
          width={0}
          height={0}
          priority={true}
          sizes={`(max-width: 768px) 100vw, (min-width: 1200px) 70vw`}
          className="cursor-pointer max-md:hidden w-full !h-full !object-cover"
        />
      </SwiperSlide>
    );
  });

  const [newImage, setNewImage] = useState(0);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    if (color) {
      setLoading(true);
      const newImages = productGallery?.filter((item) =>
        item?.variant_key?.includes(color),
      );
      const nonVariantImages = productGallery?.filter(
        (item) => item?.variant_key_array?.length === 0,
      );

      setGallery([...newImages, ...nonVariantImages]);
    }
    if (productGallery?.length) {
      setLoading(false);
    }
  }, [color]);

  const renderChevrons = () => {
    return (
      <>
        <div
          onClick={() => {
            swiper?.slidePrev();
          }}
          className={`absolute my-auto w-fit  max-md:hidden h-fit left-5 rounded-full text-xl inset-0 flex items-center justify-center z-10 cursor-pointer bg-white/80`}
        >
          {icons.chevron_left_big}
        </div>
        <div
          onClick={() => {
            swiper?.slideNext();
          }}
          className={`absolute my-auto w-fit max-md:hidden h-fit left-[90%] rounded-full text-xl inset-0 flex items-center justify-center z-10 cursor-pointer bg-white/80`}
        >
          {icons.chevron_right_big}
        </div>
        <div
          className={`absolute w-full z-10 md:hidden flex items-center justify-center gap-5 bottom-5 left-0 right-0`}
        >
          <div
            className={`flex bg-white/80 p-1 rounded-full items-center justify-center gap-2`}
            onClick={() => {
              swiper?.slidePrev();
            }}
          >
            {icons.chevron_left}
          </div>{" "}
          <div
            className={`flex bg-white/80 p-1 rounded-full items-center justify-center gap-2`}
            onClick={() => {
              swiper?.slidePrev();
            }}
          >
            {icons.chevron_right}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="md:flex md:flex-row-reverse gap-5 overflow-hidden">
      <Swiper
        spaceBetween={10}
        autoHeight
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Thumbs]}
        initialSlide={color ? newImage : 0}
        rewind={true}
        onSwiper={(swiper) => setSwiper(swiper)}
        className={`!relative md:w-[80%] !select-none`}
      >
        <DiscountStickers price={product?.data?.item?.price} />

        {loading ? (
          <SwiperSlide>
            <div className="h-full aspect-2/3 w-full bg-gray-200 animate-pulse"></div>
          </SwiperSlide>
        ) : (
          <>{productImage}</>
        )}
        {gallery?.length > 1 && renderChevrons()}
      </Swiper>

      <Swiper
        onSwiper={(swiper) => setThumbsSwiper(swiper)}
        spaceBetween={10}
        id={`thumbsSwiper`}
        autoHeight={true}
        slidesPerView={0}
        loop={filtered_images?.length > 4}
        breakpoints={{
          320: {
            direction: "horizontal",
            slidesPerView: 0,
            thumbs: {
              enabled: false,
            },
            modules: [],
          },
          768: {
            direction: "vertical",
            slidesPerView: 4.25,
            enabled: true,
            loop: filtered_images?.length > 4,
            allowSlidePrev: true,
            modules: [FreeMode, Thumbs],
          },
        }}
        freeMode={true}
        className={`max-md:!hidden !relative flex-1 gallerySwiper !select-none`}
      >
        {thumbImage}
        <div
          className={`absolute ${
            productGallery?.length > swiper?.params?.slidesPerView
              ? `block`
              : `hidden`
          } bottom-0 left-0 w-full py-1 right-0 flex items-center justify-center z-50 cursor-pointer bg-white/80`}
          onClick={() => {
            swiper?.slideNext();
          }}
        >
          <span
            className={`rotate-90`}
            onClick={() => {
              swiper?.slideNext();
            }}
          >
            {icons.chevron_right}
          </span>
        </div>
        <div
          className={`absolute ${
            productGallery?.length > swiper?.params?.slidesPerView
              ? `block`
              : `hidden`
          } top-0 left-0 w-full py-1 right-0 flex items-center justify-center z-50 cursor-pointer bg-white/80`}
          onClick={() => {
            swiper?.slidePrev();
          }}
        >
          <span
            className={`-rotate-90`}
            onClick={() => {
              swiper?.slidePrev();
            }}
          >
            {icons.chevron_right}
          </span>
        </div>
      </Swiper>
      {modalImage && (
        <div
          className={`fixed md:hidden top-0 left-0 w-full h-full bg-black/80 z-[999999] flex items-center justify-center`}
        >
          <div className="relative w-full h-full">
            <Swiper
              modules={[Pagination, Zoom]}
              pagination={true}
              direction={"vertical"}
              zoom={{
                maxRatio: 2.5,
                toggle: true,
                minRatio: 1,
              }}
              initialSlide={(gallery ?? [])?.findIndex(
                (item) => item?.image === modalImage,
              )}
              className={`modalSwiper swiper-zoom-container`}
              breakpoints={{
                0: {
                  direction: "vertical",
                  slidesPerView: 1,
                  pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                    enabled: true,
                    bulletClass: "swiper-pagination-bullet",
                    bulletActiveClass: "swiper-pagination-bullet-active",
                  },
                },
              }}
            >
              {(gallery ?? [])?.map((image, index) => {
                return (
                  <SwiperSlide key={index} className="w-full">
                    <div className="swiper-zoom-container">
                      <Image
                        src={convertHttpToHttps(image?.image) ?? ""}
                        alt={`${
                          image?.image_data?.descriptions?.alt ?? "Bogutovo"
                        }`}
                        layout="fill"
                        objectFit="cover"
                        priority={true}
                        className="cursor-pointer w-full h-auto"
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <span
            className={`absolute top-2 left-2 z-50 text-[#e10000] bg-white rounded-xl px-2 py-1 text-xl cursor-pointer`}
            onClick={() => {
              setModalImage(null);
            }}
          >
            {icons.close}
          </span>
        </div>
      )}
    </div>
  );
};
