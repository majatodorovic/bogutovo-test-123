"use client";

import { useProductBreadcrumbs } from "@/_hooks";
import { Breadcrumbs } from "@/_components/shared/breadcrumbs";

export const ProductBreadcrumbs = ({ slug, category_id }) => {
  const { data: breadcrumbs } = useProductBreadcrumbs({ slug, category_id });

  return (
    <div className={`md:mt-[1.5rem]`}>
      <Breadcrumbs parents={breadcrumbs?.steps} name={breadcrumbs?.end?.name} />
    </div>
  );
};
