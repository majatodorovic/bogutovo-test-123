"use client";
import { icons } from "@/_lib/icons";
import { useState } from "react";
import Link from "next/link";

export const MobileMenu = ({ items, landing_pages_list, pathname }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [selected, setSelected] = useState({
    category: null,
    subcategory: null,
  });

  return (
    <>
      <span
        onClick={() => {
          setOpenMenu(true);
        }}
        className={`md:hidden`}
      >
        {icons.menu}
      </span>

      <div
        className={
          openMenu
            ? `translate-x-0 z-50 border-t-4 border-b-4 border-t-boa-red border-b-boa-red transition-all duration-500 w-[80%] bg-white shadow fixed h-full top-0 left-0 flex flex-col`
            : `-translate-x-full z-50 border-t-4 border-b-4 border-t-boa-red border-b-boa-red transition-all duration-500 w-[80%] bg-white shadow fixed h-full top-0 left-0 flex flex-col`
        }
      >
        <div className={`flex flex-col py-3 overflow-y-auto`}>
          {(items?.categories ?? [])?.map(
            ({ name, slug_path, id, children }) => {
              let has_children = children && children?.length > 0;
              if (has_children) {
                return (
                  <div key={`item-${id}`}>
                    <div
                      onClick={() => {
                        setSelected({
                          category: selected.category === id ? null : id,
                          subcategory: null,
                        });
                      }}
                      key={`category-${id}`}
                      className={`flex items-center justify-between p-2 ${
                        selected.category === id && "bg-boa-red text-white"
                      }`}
                    >
                      <span className={`text-[1.1rem] font-semibold`}>
                        {name}
                      </span>
                      <span>{icons.chevron_right}</span>
                    </div>
                    {selected.category === id && (
                      <div className={`flex flex-col`}>
                        {children.map(({ name, slug_path, id, children }) => {
                          let has_children = children && children?.length > 0;
                          if (has_children) {
                            return (
                              <div key={`subitem-${id}`}>
                                <div
                                  onClick={() => {
                                    setSelected({
                                      ...selected,
                                      subcategory:
                                        selected.subcategory === id ? null : id,
                                    });
                                  }}
                                  key={`subcategory-${id}`}
                                  className={`flex items-center justify-between p-2 ${
                                    selected.subcategory === id &&
                                    "bg-[#f5f5f5]"
                                  }`}
                                >
                                  <span
                                    className={`pl-5 text-[1.1rem] font-semibold`}
                                  >
                                    {name}
                                  </span>
                                  <span>{icons.chevron_right}</span>
                                </div>
                                {selected.subcategory === id && (
                                  <div className={`flex flex-col`}>
                                    {children.map(({ name, slug_path, id }) => {
                                      return (
                                        <Link
                                          onClick={() => {
                                            setOpenMenu(false);
                                            setSelected({
                                              category: null,
                                              subcategory: null,
                                            });
                                          }}
                                          className={`!p-2 block text-[1.1rem] font-semibold`}
                                          key={`subcategory-${id}`}
                                          href={`/${slug_path}`}
                                        >
                                          <span className={`pl-10`}>
                                            {name}
                                          </span>
                                        </Link>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          } else {
                            return (
                              <Link
                                onClick={() => {
                                  setOpenMenu(false);
                                  setSelected({
                                    category: null,
                                    subcategory: null,
                                  });
                                }}
                                className={`!p-2 block text-[1.1rem] font-semibold`}
                                key={`subcategory-${id}`}
                                href={`/${slug_path}`}
                              >
                                <span className={`pl-5`}>{name}</span>
                              </Link>
                            );
                          }
                        })}
                      </div>
                    )}
                  </div>
                );
              } else {
                return (
                  <Link
                    onClick={() => {
                      setOpenMenu(false);
                      setSelected({
                        category: null,
                        subcategory: null,
                      });
                    }}
                    className={`!p-2 block text-[1.1rem] font-semibold ${
                      pathname === slug_path
                        ? "bg-boa-red text-white"
                        : "hover:bg-boa-red hover:text-white"
                    }`}
                    key={`category-${id}`}
                    href={`/${slug_path}`}
                  >
                    {name}
                  </Link>
                );
              }
            },
          )}
        </div>

        <div className={`mt-auto pt-5 flex flex-col`}>
          <div className={`flex flex-col gap-1 !p-2 `}>
            {landing_pages_list?.items?.map(({ id, name, slug }) => {
              return (
                <div key={id}>
                  <Link
                    onClick={() => {
                      setOpenMenu(false);
                      setSelected({
                        category: null,
                        subcategory: null,
                      });
                    }}
                    href={`/promo/${slug}`}
                    className={`text-[1rem] font-semibold text-boa-red animate-pulse`}
                  >
                    {name}
                  </Link>
                </div>
              );
            })}
          </div>
          {(items?.pages ?? [])?.map(({ title, href }, i) => {
            return (
              <Link
                onClick={() => {
                  setOpenMenu(false);
                  setSelected({
                    category: null,
                    subcategory: null,
                  });
                }}
                className={`odd:bg-[#f5f5f5] !p-2 block text-[1.1rem] font-semibold ${
                  pathname === href
                    ? "!bg-boa-red !text-white"
                    : "hover:!bg-boa-red hover:!text-white"
                }`}
                key={`page-${i}`}
                href={`${href}`}
              >
                {title}
              </Link>
            );
          })}
        </div>
      </div>
      {openMenu && (
        <div
          className={`bg-black/40 fixed top-0 left-0 w-dvw h-dvh z-40`}
          onClick={() => setOpenMenu(false)}
        ></div>
      )}
    </>
  );
};
