"use client";
import { Layout } from "@/_components/ui/layout";
import { Suspense } from "react";
import { PromoBasicData, PromoConditions, PromoThumbs } from "@/_pages/promo";

export const Promo = ({ slug }) => {
  return (
    <Layout>
      <Suspense
        fallback={
          <>
            <div
              className={`mt-10 w-full h-5 bg-slate-200 animate-pulse`}
            ></div>
            <div
              className={`mt-5 w-full h-[30rem] bg-slate-200 animate-pulse`}
            ></div>
            <div
              className={`mt-5 w-full h-[5rem] bg-slate-200 animate-pulse`}
            ></div>
          </>
        }
      >
        <PromoBasicData slug={slug} />
      </Suspense>
      <Suspense
        fallback={<div className={`h-10 w-full bg-slate-200 animate-pulse`} />}
      >
        <PromoConditions slug={slug} />
      </Suspense>
      <Suspense
        fallback={<div className={`h-10 w-full bg-slate-200 animate-pulse`} />}
      >
        <PromoThumbs slug={slug} />
      </Suspense>
    </Layout>
  );
};
