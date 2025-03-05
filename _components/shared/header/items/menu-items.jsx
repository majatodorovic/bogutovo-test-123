"use client";

import { useCategoryTree, useLandingPages } from "@/_hooks";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getActiveCategoryItemIds,
  MobileMenu,
} from "@/_components/shared/header";
import { CategoriesMenu } from "@/_components/shared/header";

export const MenuItems = () => {
  const { data: categories } = useCategoryTree();
  const { data: landing_pages_list } = useLandingPages();

  const [categoriesMenu, setCategoriesMenu] = useState({
    show: false,
    data: [],
  });

  const pathname = usePathname();

  let items = {
    categories: [...categories],
    pages: [
      { title: "Lokacije", href: "/lokacije" },
      { title: "Veleprodaja", href: "/veleprodaja" },
      { title: "O nama", href: "/o-nama" },
      { title: "Kontakt", href: "/kontakt" },
    ],
  };

  const active_items_ids = getActiveCategoryItemIds(categories, pathname);

  useEffect(() => {
    setCategoriesMenu({
      show: false,
      data: [],
    });
  }, [pathname]);

  return (
    <nav className={`flex gap-1 items-center max-w-[45%]`}>
      <MobileMenu
        categoriesMenu={categoriesMenu}
        setCategoriesMenu={setCategoriesMenu}
        active_items_ids={active_items_ids}
        items={items}
        landing_pages_list={landing_pages_list}
        pathname={pathname}
      />
      <Link
        className={`max-md:hidden text-[0.7rem] 2xl:text-[0.8rem] 3xl:text-[0.911rem] font-semibold ${
          pathname === "/" && !categoriesMenu?.show
            ? "item-active"
            : "item-hover"
        }`}
        href={`/`}
      >
        Početna
      </Link>
      {(items?.categories ?? [])?.map(
        ({ id, name, link: { link_path: slug_path }, children }) => {
          return !children || children?.length === 0 ? (
            <Link
              className={`max-md:hidden text-[0.7rem] 2xl:text-[0.8rem] 3xl:text-[0.911rem] font-semibold  ${
                active_items_ids.includes(id) ? "item-active" : "item-hover"
              }`}
              key={id}
              href={`/${slug_path}`}
            >
              {name}
            </Link>
          ) : (
            <span
              onClick={() => {
                setCategoriesMenu({
                  show:
                    categoriesMenu?.data === children
                      ? !categoriesMenu?.show
                      : true,
                  data: categoriesMenu?.data === children ? null : children,
                });
              }}
              className={`max-md:hidden text-[0.7rem] 2xl:text-[0.8rem] 3xl:text-[0.911rem] cursor-pointer font-semibold  ${
                (active_items_ids.includes(id) && !categoriesMenu?.show) ||
                children === categoriesMenu?.data
                  ? "item-active"
                  : "item-hover"
              }`}
              key={id}
            >
              {name}
            </span>
          );
        },
      )}
      {(items?.pages ?? [])?.map(({ title, href }, i) => {
        return (
          <Link
            className={`max-md:hidden text-[0.7rem] 2xl:text-[0.8rem] 3xl:text-[0.911rem] font-semibold ${
              pathname === href ? "item-active" : "item-hover"
            }`}
            key={`page-${i}`}
            href={`${href}`}
          >
            {title}
          </Link>
        );
      })}
      <CategoriesMenu
        categoriesMenu={categoriesMenu}
        setCategoriesMenu={setCategoriesMenu}
        active_items_ids={active_items_ids}
        landing_pages_list={landing_pages_list}
      />
    </nav>
  );
};
