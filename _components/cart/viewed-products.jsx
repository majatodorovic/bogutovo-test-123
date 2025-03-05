"use client";

import { useEffect, useState } from "react";
import { Slider } from "@/_components/ui/slider";
import { Layout } from "@/_components/ui/layout";
import { get } from "@/_api/api";

export const ViewedProducts = () => {
  let viewed_products = localStorage?.getItem("viewed_products");
  let products = JSON.parse(viewed_products);
  if (products?.length > 0) {
    return (
      <Layout className={`mt-[2rem] md:mt-[6.125rem]`}>
        <Slider
          title={`Gledali ste i ove modele`}
          items={products}
          type={"products"}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 5,
            },
          }}
          slidesPerView={1.5}
          rewind={true}
          spaceBetween={25}
        />
      </Layout>
    );
  }
};
