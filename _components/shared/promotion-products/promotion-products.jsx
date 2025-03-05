"use client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { list } from "@/_api/api";
import { Slider } from "@/_components/ui/slider";
import { Layout } from "@/_components/ui/layout";
import { useState } from "react";

export const PromotionProducts = ({ api_url, title }) => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["promotion-products", api_url],
    queryFn: async () => {
      return await list(api_url, { render: false }).then((res) => {
        return res?.payload?.items;
      });
    },
  });

  if (isLoading) {
    return (
      <Layout
        className={`mt-[2rem] md:py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5`}
      >
        {[...Array(5)].map((_, i) => {
          return (
            <div
              key={i}
              className={`aspect-2/3 w-full h-full bg-slate-200 animate-pulse`}
            />
          );
        })}
      </Layout>
    );
  }

  if (products?.length > 0 && !isLoading) {
    return (
      <Layout className={`mt-[2rem] md:py-10`}>
        <Slider
          title={title ?? ""}
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
