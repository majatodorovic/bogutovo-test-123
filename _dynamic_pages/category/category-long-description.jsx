"use client";

import { useCategory } from "@/_hooks";
import { Layout } from "@/_components/ui/layout";

export const CategoryLongDescription = ({ slug }) => {
  const { data } = useCategory({ slug });

  if (data) {
    const {
      basic_data: { long_description },
    } = data;

    return (
      <Layout>
        <div
          className={`prose max-w-full`}
          dangerouslySetInnerHTML={{ __html: long_description }}
        />
      </Layout>
    );
  }
};
