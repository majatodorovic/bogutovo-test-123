"use client";

import { icons } from "@/_lib/icons";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDebounce, useSearch } from "@/_hooks";
import Link from "next/link";
import Image from "next/image";
import { convertHttpToHttps } from "@/_helpers";
import { Prices } from "@/_components/shared/prices";
import { Stickers } from "@/_components/shared/thumb";
import { toast } from "react-toastify";

export const Search = ({ className }) => {
  const { push } = useRouter();
  const [term, setTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (term?.length >= 3) {
      setTerm("");
      return push(`/pretraga?query=${term}`);
    }
    return toast.warn("Unesite bar 3 karaktera", {
      autoClose: 3000,
      position: "top-center",
    });
  };

  const search_ref = useRef(null);
  const debounced_search = useDebounce(term, 500);
  const { data: search_results, isFetching } = useSearch({
    searchTerm: debounced_search,
    render: false,
    isSearchPage: false,
    limit: 5,
  });

  //handle outside click
  const handleClick = (e) => {
    if (search_ref.current && !search_ref.current.contains(e.target)) {
      setTerm("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <form
      onSubmit={handleSearch}
      className={`relative !w-full ${className} max-w-[18rem] xl:max-w-[26rem] flex-shrink`}
    >
      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        type={`text`}
        placeholder={`Pretražite proizvode...`}
        className={`rounded-lg font-semibold placeholder:font-semibold text-black placeholder:text-black border-0 bg-[#ebebe9] focus:ring-[0.2rem] text-[0.7rem] 2xl:text-[0.8rem] 3xl:text-[0.911rem] h-[2.063rem] w-full focus:ring-white focus:outline-[0.12rem] focus:outline-boa-red focus:border-0`}
      />
      <span
        className={`absolute right-0 top-0 bottom-0 pr-4 cursor-pointer`}
        onClick={handleSearch}
      >
        {icons.search}
      </span>
      {term?.length < 3 && term?.length > 0 && (
        <span
          className={`absolute left-0 bottom-[-1.65rem] pl-4 text-sm text-boa-red`}
        >
          Unesite bar 3 karaktera
        </span>
      )}

      {term?.length >= 3 && search_results?.length > 0 && (
        <div
          ref={search_ref}
          className={`absolute z-50  bg-white w-full mt-1 border border-boa-dark rounded-lg`}
        >
          <div
            className={`max-h-[25rem] overflow-y-auto flex flex-col divide-y`}
          >
            {(search_results ?? [])
              .slice(0, 6)
              ?.map(
                ({
                  id,
                  slug_path,
                  inventory,
                  price,
                  image,
                  basic_data: { name },
                  stickers,
                }) => {
                  return (
                    <Link
                      onClick={() => {
                        setTerm("");
                      }}
                      key={`product-${id}`}
                      href={`/${slug_path}`}
                      className={`block text-black p-1 bg-white hover:bg-gray-100 text-[0.7rem] 2xl:text-[0.8rem] 3xl:text-[0.911rem] font-semibold`}
                    >
                      <div className={`flex items-start gap-3`}>
                        <Image
                          src={convertHttpToHttps(image?.[0])}
                          alt={`Bogutovo - ${name}`}
                          width={80}
                          height={100}
                          sizes={`100vw`}
                        />
                        <div className={`flex flex-col mt-2`}>
                          <p id={`font-semibold text-base`}>{name}</p>
                          <Prices price={price} inventory={inventory} />
                          <Stickers stickers={stickers} />
                        </div>
                      </div>
                    </Link>
                  );
                },
              )}
          </div>

          {search_results?.length > 0 && (
            <div className={`sticky bottom-0 bg-white border-t rounded-b-lg`}>
              <Link
                onClick={() => {
                  setTerm("");
                }}
                href={`/pretraga?query=${term}`}
                className={`block text-black rounded-b-lg p-[0.55rem] text-center bg-white hover:bg-gray-100 text-[0.7rem] 2xl:text-[0.8rem] 3xl:text-[0.911rem] font-semibold`}
              >
                Pogledaj sve rezultate
              </Link>
            </div>
          )}
        </div>
      )}
    </form>
  );
};
