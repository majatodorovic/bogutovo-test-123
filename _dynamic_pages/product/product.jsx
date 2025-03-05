import { BasicData, Gallery, ProductBreadcrumbs, Tabs } from "@/_dynamic_pages";
import { Suspense } from "react";
import { Layout } from "@/_components/ui/layout";
import { PromotionProducts } from "@/_components/shared/promotion-products";

export const Product = ({ path, category_id, id }) => {
  let slug = path?.[path?.length - 1];

  return (
    <>
      <Layout className={`grid grid-cols-2 gap-5 md:gap-10`}>
        <Suspense
          fallback={
            <div
              className={`aspect-2/3 col-span-2 md:col-span-1 w-full h-full bg-slate-200 animate-pulse`}
            />
          }
        >
          <div className={`col-span-2 md:col-span-1`}>
            <Gallery slug={id} />
          </div>
        </Suspense>

        <div className={`col-span-2 md:col-span-1`}>
          <Suspense
            fallback={
              <div
                className={`h-120 w-full mt-[1.5rem] bg-slate-200 animate-pulse`}
              />
            }
          >
            <ProductBreadcrumbs slug={id} category_id={category_id || "*"} />
          </Suspense>
          <Suspense
            fallback={
              <>
                <div className={`mt-5 w-full h-5 animate-pulse bg-slate-200`} />
                <div className={`mt-5 w-full h-7 animate-pulse bg-slate-200`} />
                <div
                  className={`mt-5 w-full h-12 animate-pulse bg-slate-200`}
                />
                <div
                  className={`mt-5 w-full h-32 animate-pulse bg-slate-200`}
                />
                <div
                  className={`mt-5 w-full h-10 animate-pulse bg-slate-200`}
                />
              </>
            }
          >
            <BasicData slug={slug} id={id} />
          </Suspense>
          <Suspense
            fallback={
              <div className={`mt-5 w-full h-10 bg-slate-200 animate-pulse`} />
            }
          >
            <Tabs slug={id} />
          </Suspense>
        </div>
      </Layout>

      <Suspense
        fallback={
          <div
            className={`h-20 w-full aspect-video bg-slate-200 animate-pulse`}
          />
        }
      >
        <PromotionProducts
          api_url={`/product-details/cross-sell/${id}`}
          title={"Možda Vam se svidi"}
        />
      </Suspense>
      <Suspense
        fallback={
          <div
            className={`h-20 w-full aspect-video bg-slate-200 animate-pulse`}
          />
        }
      >
        <PromotionProducts
          api_url={`/product-details/up-sell/${id}`}
          title={"Možda Vam zatreba"}
        />
      </Suspense>
      <Suspense
        fallback={
          <div
            className={`h-20 w-full aspect-video bg-slate-200 animate-pulse`}
          />
        }
      >
        <PromotionProducts
          api_url={`/product-details/recommended/${id}`}
          title={"Preporučujemo"}
        />
      </Suspense>
    </>
  );
};
