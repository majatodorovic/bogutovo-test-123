"use client";

import Link from "next/link";

export const Breadcrumbs = ({ parents = [], name = "" }) => {
  return (
    <div className={`flex flex-wrap items-center text-xs md:text-sm`}>
      <Link href="/" className={`hover:text-boa-red`}>
        Početna /{" "}
      </Link>
      {(parents ?? [])?.map(({ link: { link_path: slug_path }, name }) => {
        if (slug_path) {
          return (
            <Link
              className={`hover:text-boa-red`}
              href={`/${slug_path}`}
              key={`${slug_path}`}
            >
              &nbsp;{name} /
            </Link>
          );
        } else {
          return <span key={`${name}`}>&nbsp;{name} /</span>;
        }
      })}
      <span>&nbsp;{name}</span>
    </div>
  );
};
