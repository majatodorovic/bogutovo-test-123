"use client";

import Image from "next/image";

export const SelectCountry = () => {
  return (
    <>
      <div className={`flex items-center gap-5`}>
        <Image
          src={`/icons/serbia.png`}
          alt={`Bogutovo`}
          width={30}
          height={30}
          quality={100}
          className={`border border-white rounded-full`}
        />
        <span className={`font-light text-base text-white`}>Srbija</span>
      </div>
    </>
  );
};
