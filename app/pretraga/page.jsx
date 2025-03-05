import { list } from "@/_api/api";
import { Suspense } from "react";
import { Thumb } from "@/_components/shared/thumb";
import { Layout } from "@/_components/ui/layout";
import { Button } from "@/_components/shared/button";
import Link from "next/link";

const getSearchResults = async (query) => {
  return await list(`/products/search/list`, {
    search: query,
    render: false,
  }).then((res) => res?.payload?.items);
};

const Search = ({ searchParams }) => {
  const { query } = searchParams;

  return <SearchResults query={query} />;
};

export default Search;

const SearchResults = async ({ query }) => {
  const results = await getSearchResults(query);

  return (
    <Layout>
      {results?.length > 0 ? (
        <div className={`flex flex-col py-10`}>
          <h1 className={`text-[1.823rem] font-bold`}>
            Rezultati pretrage za termin{" "}
            <span className={`text-boa-red`}>"{query}"</span>
          </h1>
          <div
            className={`grid grid-cols-2 mt-10 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5`}
          >
            {results?.map(({ id }) => {
              return (
                <Suspense
                  fallback={
                    <div
                      className={`aspect-2/3 w-full h-full bg-slate-200 animate-pulse`}
                    />
                  }
                  key={id}
                >
                  <Thumb
                    id={id}
                    category_id={"*"}
                    refreshWishlist={null}
                    key={id}
                  />
                </Suspense>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={`py-10 flex flex-col`}>
          <h1 className={`text-[1.823rem] font-bold`}>
            Nema rezultata za termin{" "}
            <span className={`text-boa-red`}>"{query}"</span>
          </h1>
          <p className={`mt-5 text-[1.05rem]`}>
            Pokušajte sa drugim terminom ili proverite da li ste dobro napisali
            traženi pojam.
          </p>
          <Link href={`/`}>
            <Button className={`!w-fit mt-5`}>Nazad na početnu</Button>
          </Link>
        </div>
      )}
    </Layout>
  );
};

export const generateMetadata = ({ searchParams: { query } }) => {
  return {
    title: `Pretraga: ${query} | Bogutovo`,
    robots: {
      follow: false,
      index: false,
    },
  };
};
