"use client";
import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { get as GET } from "@/_api/api";

export const CategoryChildren = ({ slug }) => {
  const { data: categories } = useSuspenseQuery({
    queryKey: ["products", { slug }],
    queryFn: async () => {
      return await GET(`/categories/product/tree/branch/parent/${slug}`).then(
        (response) => response?.payload,
      );
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const currentSlug = categories?.slug;

  return (
    <>
      <div className={`mt-[2.5rem] flex flex-wrap md:gap-y-2`}>
        {categories?.childrens &&
          (categories?.childrens ?? [])?.map((child) => (
            <div className={`max-md:mx-[2px] mx-1 max-md:my-1`} key={child?.id}>
              {currentSlug === child?.slug ? (
                <div
                  className={`rounded-md py-1 max-md:px-2 px-4 hover:bg-boa-red group whitespace-nowrap w-max ${
                    currentSlug === child?.slug
                      ? `bg-boa-red text-white`
                      : `bg-white text-black`
                  }`}
                >
                  <p className={`text-sm group-hover:text-white`}>
                    {child?.basic_data?.name}
                  </p>
                </div>
              ) : (
                <Link href={`/${child?.link?.link_path}`}>
                  <div
                    className={`rounded-md text-sm py-1 max-md:px-2 px-4 hover:bg-boa-red hover:text-white whitespace-nowrap w-max ${
                      currentSlug === child?.slug
                        ? "bg-boa-red text-white"
                        : "bg-boa-dark-blue text-white"
                    }`}
                  >
                    <p className="">{child?.basic_data?.name}</p>
                  </div>
                </Link>
              )}
            </div>
          ))}
      </div>
    </>
  );
};
