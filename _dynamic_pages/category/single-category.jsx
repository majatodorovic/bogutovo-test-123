"use client";

import { useCategory } from "@/_hooks";
import { Breadcrumbs } from "@/_components/shared/breadcrumbs";
import { Layout } from "@/_components/ui/layout";
import { generateBreadcrumbSchema } from "@/_functions";
import { CategoryChildren } from "@/_dynamic_pages/category/category-children";
import { Suspense } from "react";

export const SingleCategory = ({ slug, path, base_url }) => {
  const {
    data: {
      parents,
      basic_data: { name, description },
    },
  } = useCategory({ slug });

  const breadcrumbs_schema = generateBreadcrumbSchema(
    parents,
    name,
    path,
    base_url,
  );

  return (
    <div className={`border-t border-t-[#ebebe9]`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs_schema) }}
      />
      <Layout>
        <div className={`mt-5 flex items-center justify-start md:justify-end`}>
          <Breadcrumbs parents={parents} name={name} />
        </div>
        <div className={`mt-5`}>
          <h1 className={`text-[1.823rem] font-bold`}>{name}</h1>
          <p
            className={`mt-[2rem] font-normal text-[1.05rem] max-w-full w-full`}
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
        </div>
        <Suspense
          fallback={
            <div
              className={`h-5 mt-[2rem] bg-slate-300 animate-pulse w-full`}
            />
          }
        >
          <CategoryChildren slug={slug} name={name} />
        </Suspense>
      </Layout>
    </div>
  );
};
