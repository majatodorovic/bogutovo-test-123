import { SingleCategory, CategoryProducts } from "@/_dynamic_pages";
import { Suspense } from "react";

export const Category = ({
  params: { slug_path },
  searchParams: { sort, viewed, filteri, strana },
  category_id,
  base_url,
}) => {
  let slug = category_id;
  const sort_arr = (sort ?? "_")?.split("_");
  const sortField = sort_arr?.[0];
  const sortDirection = sort_arr?.[1];
  const page = Number(strana) > 0 ? Number(strana) : 1;

  const filters = filteri?.split("::")?.map((filter) => {
    const [column, selected] = filter?.split("=");
    const selectedValues = selected?.split("_");
    return {
      column,
      value: {
        selected: selectedValues,
      },
    };
  });

  return (
    <>
      <Suspense
        fallback={
          <>
            <div className={`h-10 w-full bg-slate-200 animate-pulse mt-5`} />
            <div className={`h-10 w-full bg-slate-200 animate-pulse mt-5`} />
            <div className={`h-32 w-full bg-slate-200 animate-pulse mt-5`} />
          </>
        }
      >
        <SingleCategory slug={slug} base_url={base_url} path={slug_path} />
      </Suspense>
      <CategoryProducts
        slug={slug}
        allFilters={[]}
        sortDirection={sortDirection}
        sortField={sortField}
        filters={filters}
        strana={page}
      />
    </>
  );
};
