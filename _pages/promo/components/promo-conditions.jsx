"use client";

import { Suspense } from "react";
import { Thumb } from "@/_components/shared/thumb";
import { useLandingPagesConditions } from "@/_hooks";

export const PromoConditions = ({ slug }) => {
  const { data: conditions } = useLandingPagesConditions({ slug });

  if (!conditions) return null;

  return (
    conditions?.items?.length > 0 && (
      <div className={`my-12`}>
        <h3 className={`text-[1.823rem] font-bold my-5 max-sm:leading-[100%]`}>
          Artikli uključeni u promociju
        </h3>
        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5`}
        >
          {conditions?.items?.map(({ id }) => {
            return (
              <Suspense key={`suspense-promo-${id}`}>
                <Thumb
                  key={`promo-thumb-${id}`}
                  id={id}
                  refreshWishlist={() => {}}
                  category_id={"*"}
                  show_delete={false}
                />
              </Suspense>
            );
          })}
        </div>
      </div>
    )
  );
};
