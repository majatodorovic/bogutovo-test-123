"use client";

import { useProductDescription } from "@/_hooks";

export const Description = ({ slug }) => {
  const { data: description } = useProductDescription({ slug });

  return (
    <div className={`mt-5`}>
      <p
        className={`font-normal prose !text-black prose-a:text-boa-red`}
        dangerouslySetInnerHTML={{
          __html:
            description?.description || description?.short_description || "",
        }}
      />
    </div>
  );
};
