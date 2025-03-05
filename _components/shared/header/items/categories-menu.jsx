"use client";

import { useEffect, useRef, useState } from "react";
import { useLandingPages } from "@/_hooks";
import Link from "next/link";
import { Layout } from "@/_components/ui/layout";
import Image from "next/image";
import { convertHttpToHttps } from "@/_helpers";

export const CategoriesMenu = ({
  categoriesMenu,
  setCategoriesMenu,
  active_items_ids,
  landing_pages_list,
}) => {
  const menu_ref = useRef(null);

  const [selected, setSelected] = useState({
    title: "",
    image: "",
    data: [],
    slug_path: "",
  });

  const handleSelect = (title, image, data, slug_path) => {
    setSelected({
      title,
      image,
      data,
      slug_path,
    });
  };

  const handleReset = () => {
    setCategoriesMenu({ show: false, data: [] });
    setSelected({
      title: "",
      image: "",
      data: [],
    });
  };

  const handleOutsideClick = (e) => {
    if (!menu_ref.current.contains(e.target) && categoriesMenu?.show) {
      handleReset();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
  }, []);

  useEffect(() => {
    setSelected({
      title: "",
      data: [],
      image: "",
    });
  }, [categoriesMenu?.data]);

  return (
    <>
      <div
        ref={menu_ref}
        className={
          categoriesMenu?.show
            ? `absolute top-full w-full py-5 left-0 right-0 bg-white shadow-lg z-30`
            : `hidden`
        }
      >
        <Layout className={`flex items-start justify-between`}>
          <div className={`flex items-start gap-[12rem]`}>
            <div className={`flex flex-col gap-1`}>
              {landing_pages_list?.items?.map(({ id, name, slug }) => {
                return (
                  <div key={id}>
                    <Link
                      onClick={handleReset}
                      href={`/promo/${slug}`}
                      className={`text-[1rem] font-semibold text-boa-red animate-pulse`}
                    >
                      {name}
                    </Link>
                  </div>
                );
              })}

              {categoriesMenu?.data?.map(
                ({
                  id,
                  name,
                  image,
                  link: { link_path: slug_path },
                  children,
                }) => {
                  if (children && children?.length > 0) {
                    return (
                      <span
                        onClick={() => {
                          if (
                            selected?.data?.length > 0 &&
                            children === selected?.data
                          ) {
                            setSelected({
                              title: "",
                              image: "",
                              data: [],
                            });
                          } else {
                            handleSelect(name, image, children, slug_path);
                          }
                        }}
                        className={`text-[1rem] font-semibold cursor-pointer ${
                          (active_items_ids.includes(id) && !selected?.title) ||
                          children === selected?.data
                            ? "text-boa-red"
                            : "hover:text-boa-red"
                        }`}
                        key={id}
                      >
                        {name}
                      </span>
                    );
                  } else {
                    return (
                      <Link
                        onClick={handleReset}
                        href={`/${slug_path}`}
                        className={`text-[1rem] font-semibold hover:text-boa-red  ${
                          active_items_ids.includes(id)
                            ? "text-boa-red"
                            : "hover:text-boa-red"
                        }`}
                        key={id}
                      >
                        {name}
                      </Link>
                    );
                  }
                },
              )}
            </div>
            {selected?.data?.length > 0 && (
              <div className={`flex flex-col gap-2`}>
                <h4 className={`font-bold text-black`}>{selected?.title}</h4>
                <Link
                  href={`/${selected?.slug_path}`}
                  onClick={handleReset}
                  className={`item-active !w-fit text-sm hover:drop-shadow-lg`}
                >
                  Pogledaj sve
                </Link>
                <div className={`mt-3 flex flex-col`}>
                  {(selected?.data ?? [])?.map(
                    ({ id, name, link: { link_path: slug_path } }) => {
                      return (
                        <Link
                          onClick={handleReset}
                          href={`/${slug_path}`}
                          className={`text-[0.9rem] font-normal ${
                            active_items_ids.includes(id)
                              ? "text-boa-red"
                              : "hover:text-boa-red"
                          }`}
                          key={id}
                        >
                          {name}
                        </Link>
                      );
                    },
                  )}
                </div>
              </div>
            )}
          </div>
          {selected?.image && (
            <Image
              src={convertHttpToHttps(selected?.image)}
              alt={`Bogutovo - ${selected?.title}`}
              width={0}
              height={0}
              className={`w-auto h-auto max-w-[460px]`}
            />
          )}
        </Layout>
      </div>
      {categoriesMenu?.show && (
        <div
          onClick={handleReset}
          className={`fixed z-[1] w-full h-full top-[7rem] left-0 bg-transparent opacity-50`}
        ></div>
      )}
    </>
  );
};
