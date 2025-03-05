"use client";

import { useProductDeclaration } from "@/_hooks";

export const Declaration = ({ slug }) => {
  const { data } = useProductDeclaration({ slug });
  return (
    <div className={`mt-5 flex flex-col-reverse gap-1`}>
      <p dangerouslySetInnerHTML={{ __html: data?.note }} />
    </div>
  );
};
