"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { Thumb } from "@/_components/shared/thumb";
import { useCategoryFilters, useCategoryProducts } from "@/_hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { Layout } from "@/_components/ui/layout";
import { Filters, FiltersMobile } from "@/_dynamic_pages";
import { CategoryLongDescription } from "@/_dynamic_pages/category/category-long-description";
import { Pagination } from "@/_components/pagination";

export const CategoryProducts = ({
  filters,
  sortDirection,
  sortField,
  allFilters = [],
  slug,
  section,
  strana,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  //params iz URL-a
  const filterKey = params?.get("filteri");
  const sortKey = params?.get("sort");

  const [page, setPage] = useState(strana ?? 1);

  const [sort, setSort] = useState({
    field: sortField ?? "",
    direction: sortDirection ?? "",
  });

  const [selectedFilters, setSelectedFilters] = useState(filters ?? []);
  const [productsPerView, setProductsPerView] = useState(5);
  const [tempSelectedFilters, setTempSelectedFilters] = useState([]);
  const [availableFilters, setAvailableFilters] = useState(allFilters ?? []);
  const [changeFilters, setChangeFilters] = useState(false);
  const [lastSelectedFilterKey, setLastSelectedFilterKey] = useState("");
  const [openFilter, setOpenFilter] = useState(false);

  // azuriramo query parametre sa selektovanim sortom, stranicom i filterima
  const updateURLQuery = (sort, selectedFilters, page) => {
    let sort_tmp;
    let filters_tmp;
    let page_tmp;

    if (sort?.field !== "" && sort?.direction !== "") {
      sort_tmp = `${sort?.field}_${sort?.direction}`;
    }

    if (selectedFilters?.length > 0) {
      filters_tmp = selectedFilters
        ?.map((filter) => {
          const selectedValues = filter?.value?.selected?.join("_");
          return `${filter?.column}=${selectedValues}`;
        })
        .join("::");
    } else {
      filters_tmp = "";
    }

    if (page > 1) {
      page_tmp = page;
    } else {
      page_tmp = 1;
    }

    return { sort_tmp, filters_tmp, page_tmp };
  };

  const generateQueryString = (sort_tmp, filters_tmp, page_tmp) => {
    let queryString = `?${filters_tmp ? `filteri=${filters_tmp}` : ""}${
      filters_tmp && (sort_tmp || page_tmp) ? "&" : ""
    }${sort_tmp ? `sort=${sort_tmp}` : ""}${
      sort_tmp && page_tmp ? "&" : ""
    }${page_tmp > 1 ? `strana=${page_tmp}` : ""}`;

    router.push(queryString, { scroll: false });
    return queryString;
  };

  useEffect(() => {
    const { sort_tmp, filters_tmp, page_tmp } = updateURLQuery(
      sort,
      selectedFilters,
      page,
    );

    generateQueryString(sort_tmp, filters_tmp, page_tmp);
  }, [sort, selectedFilters, page]);

  useEffect(() => {
    // Add overflow-hidden class to the body when openFilter is true
    if (openFilter) {
      document.body.style.overflow = 'hidden'; // This disables scrolling
    } else {
      document.body.style.overflow = 'auto'; // This restores scrolling
    }

    // Clean up on component unmount
    return () => {
      document.body.style.overflow = 'auto'; // Ensure scroll is enabled on unmount
    };
  }, [openFilter]); 

  //dobijamo proizvode za kategoriju sa api-ja
  const { data, error, isError, isFetching, isFetched } = useCategoryProducts({
    slug,
    page: strana ?? 1,
    limit: 10,
    sort: sortKey ?? "_",
    setSelectedFilters: setSelectedFilters,
    filterKey: filterKey,
    setSort: setSort,
    render: false,
    setIsLoadingMore: () => {},
    section: section,
    setPage: setPage,
  });

  const mutateFilters = useCategoryFilters({
    slug,
    page,
    limit: 10,
    sort,
    selectedFilters: selectedFilters,
    section: section,
  });

  //ako je korisnik dosao na stranicu preko linka sa prisutnim filterima u URL,onda se ti filteri selektuju i okida se api da azurira dostupne filtere
  useEffect(() => {
    if (filters?.length > 0) {
      mutateFilters.mutate({
        slug,
        selectedFilters: selectedFilters,
        lastSelectedFilterKey,
        setAvailableFilters,
        availableFilters,
        section: section,
      });
    }
  }, []);

  //okidamo api za filtere na promenu filtera
  useEffect(() => {
    mutateFilters.mutate({
      slug,
      selectedFilters: selectedFilters,
      lastSelectedFilterKey,
      setAvailableFilters,
      availableFilters,
      section: section,
    });
  }, [selectedFilters?.length]);

  const renderedItems = useMemo(() => {
    return data?.items?.map(({ id }) => (
      <Suspense
        key={id}
        fallback={
          <div
            className={`col-span-1 w-full min-w-0 h-full aspect-2/3 bg-slate-300 animate-pulse`}
          ></div>
        }
      >
        <Thumb id={id} refreshWishlist={() => {}} category_id={slug} />
      </Suspense>
    ));
  }, [data?.items]);

  const handleProductsPerView = (productsPerView) => {
    switch (productsPerView) {
      case 5:
        return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5";
      case 4:
        return "grid-cols-2 md:grid-cols-4";
      case 2:
        return "grid-cols-2 md:w-[60%] mx-auto";
    }
  };

  

  return (
    <main className={`mt-5 md:mt-10`}>
      <Filters
        selectedFilters={selectedFilters}
        availableFilters={availableFilters}
        setSelectedFilters={setSelectedFilters}
        sort={sort}
        setPage={setPage}
        setSort={setSort}
        changeFilters={changeFilters}
        tempSelectedFilters={tempSelectedFilters}
        setIsBeingFiltered={() => {}}
        pagination={data?.pagination}
        setProductsPerView={setProductsPerView}
        productsPerView={productsPerView}
        setTempSelectedFilters={setTempSelectedFilters}
        setLastSelectedFilterKey={setLastSelectedFilterKey}
        setChangeFilters={setChangeFilters}
      />
      <div
        className={`flex items-center gap-5 w-full px-2 mx-auto md:hidden bg-white py-2`}
      >
        <button
          className={`flex items-center justify-center text-[0.9rem] md:text-[1.2rem] text-center py-2 flex-1 border`}
          onClick={() => {
            setOpenFilter(true);
          }}
        >
          Filteri
        </button>
        <div className={`flex items-center gap-3`}>
          {/*a div 40px high and 40px wide*/}
          <div
            className={`w-[30px] h-[30px] border-2 ${
              productsPerView === 1 && "border-black"
            }`}
            onClick={() => setProductsPerView(1)}
          ></div>
          {/*a div 40px high and 40px wide that has 9 smaller squares inside*/}
          <div
            className={`w-[30px] h-[30px] border grid grid-cols-2 ${
              productsPerView === 2 && "border-black"
            }`}
            onClick={() => setProductsPerView(2)}
          >
            {Array.from({ length: 4 }, (_, i) => {
              return (
                <div
                  key={i}
                  className={`col-span-1 border ${
                    productsPerView === 2 && "border-black"
                  }`}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
      <Layout className={`py-2 md:py-10`}>
        <div className={`grid ${handleProductsPerView(productsPerView)} gap-5`}>
          {renderedItems}
        </div>

        <Pagination
          generateQueryString={() => {
            const { sort_tmp, filters_tmp, page_tmp } = updateURLQuery(
              sort,
              selectedFilters,
              page,
            );
            return generateQueryString(sort_tmp, filters_tmp, page_tmp);
          }}
          data={data}
          page={page}
          slug={slug}
          setPage={setPage}
        />
      </Layout>
      <div
        className={
          openFilter
            ? `fixed top-0 left-0 w-full h-[100dvh] z-[3000] bg-white translate-x-0 duration-500`
            : `fixed top-0 left-0 w-full h-[100dvh] z-[3000] bg-white -translate-x-full duration-500`
        }
      >
        <FiltersMobile
          selectedFilters={selectedFilters}
          availableFilters={availableFilters}
          setSelectedFilters={setSelectedFilters}
          sort={sort}
          setPage={setPage}
          setSort={setSort}
          changeFilters={changeFilters}
          pagination={data?.pagination}
          setProductsPerView={setProductsPerView}
          productsPerView={productsPerView}
          setFilterOpen={setOpenFilter}
          setTempSelectedFilters={setTempSelectedFilters}
          setChangeFilters={setChangeFilters}
          tempSelectedFilters={tempSelectedFilters}
          setLastSelectedFilterKey={setLastSelectedFilterKey}
        />
      </div>
      <Suspense
        fallback={
          <div className={`mt-10 h-10 w-full bg-slate-200 animate-pulse`} />
        }
      >
        <CategoryLongDescription slug={slug} />
      </Suspense>
    </main>
  );
};
