"use client";

import { useNewsletter } from "@/_hooks";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Image from "next/image";

export const NewsletterForm = () => {
  const input_ref = useRef(null);
  const { mutate: subscribe, isPending, isSuccess } = useNewsletter();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(input_ref.current.value)) {
      subscribe({ email: input_ref.current.value });
    } else {
      toast.warn("Unesite validnu e-mail adresu", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  // Reset input value when isSuccess changes to true
  useEffect(() => {
    if (isSuccess) {
      input_ref.current.value = "";
    }
  }, [isSuccess]);

  return (
    <form className={`relative max-w-[21rem] w-full`} onSubmit={handleSubmit}>
      <input
        type={`email`}
        ref={input_ref}
        placeholder={`Unesi svoj email`}
        className={`w-full bg-white rounded-lg placeholder:text-black placeholder:text-sm font-medium placeholder:font-medium focus:ring-2 focus:ring-boa-red focus:outline-0 focus:outline-boa-red focus:border-0 border-0`}
      />
      <Image
        onClick={handleSubmit}
        src={`/icons/send.png`}
        alt={`Bogutovo`}
        width={25}
        height={20}
        className={`absolute cursor-pointer right-2 top-2`}
        quality={100}
      />
    </form>
  );
};
