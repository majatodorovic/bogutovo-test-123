"use client";

import { useWishlist } from "@/_hooks";
import { Layout } from "@/_components/ui/layout";
import { Suspense } from "react";
import { Thumb } from "@/_components/shared/thumb";
import Link from "next/link";
import { Breadcrumbs } from "@/_components/shared/breadcrumbs";

export const Wishlist = () => {
  const { data, refetch, isFetching } = useWishlist();

  if (!isFetching && data?.length > 0) {
    return (
      <Layout>
        <div className={`ml-auto flex justify-start md:justify-end mt-5`}>
          <Breadcrumbs name={`Lista želja`} parents={[]} />
        </div>
        <h1 className={`text-[1.823rem] font-bold my-5`}>Lista želja</h1>
        <div
          className={`grid grid-cols-2 md:mt-10 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5`}
        >
          {data?.map(({ id_product: id }) => {
            return (
              <Suspense
                key={`suspense-${id}`}
                fallback={
                  <div
                    className={`aspect-2/3 bg-slate-200 animate-pulse w-full h-full`}
                  />
                }
              >
                <Thumb
                  key={`thumb-${id}`}
                  id={id}
                  refreshWishlist={refetch}
                  category_id={"*"}
                  show_delete={true}
                />
              </Suspense>
            );
          })}
        </div>
      </Layout>
    );
  }

  if (!isFetching && data?.length === 0) {
    return (
      <div
        className={`container mx-auto my-32 flex max-w-[80%] flex-col items-center justify-center px-2 2xl:px-[2rem] 3xl:px-[3rem] 4xl:px-[9.5rem]`}
      >
        <div
          className={`flex flex-col items-center justify-center gap-3 rounded-lg border p-6 text-center sm:p-10`}
        >
          <h2 className={`text-2xl font-medium uppercase`}>
            Lista želja je prazna
          </h2>
          <h3 className={`text-[1rem] font-light`}>
            Kada dodate proizvode u listu želja, oni će se ovde prikazati.
          </h3>
          <div className={`text-[1rem] font-light`}>
            Povratak na{" "}
            <Link className={`font-normal underline `} href={`/`}>
              početnu stranu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isFetching) {
    return (
      <Layout className={`py-5 md:py-20`}>
        <div
          className={`grid grid-cols-2 md:mt-10 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5`}
        >
          {Array.from({ length: 10 })?.map((_, i) => {
            return (
              <div
                key={i}
                className={`aspect-2/3 bg-slate-200 animate-pulse w-full h-full`}
              />
            );
          })}
        </div>
      </Layout>
    );
  }
};
