"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";
import { CheckoutData } from "./CheckoutData";
import { useCart, useSummary } from "@/_hooks/ecommerce.hooks";
import Link from "next/link";
import { Layout } from "@/_components/ui/layout";
import { ViewedProducts } from "@/_components/cart/viewed-products";
import { get } from "@/_api/api";

export const Checkout = ({ paymentOptions, deliveryOptions, className }) => {
  const [token, setToken] = useState();

  const verifyCaptcha = useCallback((token) => {
    setToken(token);
  }, []);

  const [formData, setFormData] = useState({
    customer_type_billing: "personal",
    first_name_shipping: "",
    last_name_shipping: "",
    phone_shipping: "",
    email_shipping: "",
    address_shipping: "",
    object_number_shipping: "",
    town_name_shipping: "",
    zip_code_shipping: "",
    id_country_shipping: "193",
    country_name_shipping: "Srbija",
    note_shipping: "",
    first_name_billing: "",
    last_name_billing: "",
    phone_billing: "",
    email_billing: "",
    address_billing: "",
    object_number_billing: "",
    town_name_billing: "",
    zip_code_billing: "",
    id_country_billing: "193",
    country_name_billing: "Srbija",
    note_billing: "",
    payment_method: "",
    delivery_method: "",
    note: "",
    gcaptcha: token,
    company_name_billing: null,
    pib_billing: null,
    maticni_broj_billing: null,
    floor_billing: null,
    apartment_number_billing: null,
    id_town_billing: null,
    id_municipality_billing: null,
    municipality_name_billing: null,
    id_company_shipping: null,
    id_company_address_shipping: null,
    company_name_shipping: null,
    pib_shipping: null,
    maticni_broj_shipping: null,
    floor_shipping: null,
    apartment_number_shipping: null,
    id_town_shipping: null,
    id_municipality_shipping: null,
    municipality_name_shipping: null,
    delivery_method_options: [],
    payment_method_options: [],
    promo_code: null,
    promo_code_options: [],
    accept_rules: false,
  });

  //fetchujemo sve artikle iz korpe
  const { data, refetch: refreshCart, isLoading: isFetching } = useCart();

  //fetchujemo summary korpe (iznos,popuste,dostavu itd)
  const { data: summary, refetch: refreshSummary } = useSummary({
    items: data?.items?.map((item) => {
      return Number(item?.cart?.quantity);
    }),
  });

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const getDdlBilling = async () => {
      return await get(`/checkout/ddl/shipping_addresses`).then((response) => {
        if (
          response?.payload?.[0]?.id !== null &&
          response?.payload?.[0]?.id !== undefined
        ) {
          get(`/checkout/shipping/${response?.payload?.[0]?.id}`).then(
            (response) => {
              const data = response?.payload;
              setFormData({
                first_name_: data?.[0]?.first_name,
                first_name_shipping: data?.[0]?.first_name,
                first_name_billing: data?.[0]?.first_name,
                last_name_: data[0]?.last_name,
                last_name_billing: data[0]?.last_name,
                last_name_shipping: data[0]?.last_name,
                address_: data[0]?.address,
                address_billing: data[0]?.address,
                address_shipping: data[0]?.address,
                email_: data[0]?.email,
                email_billing: data[0]?.email,
                email_shipping: data[0]?.email,
                phone_: data[0]?.phone,
                phone_billing: data[0]?.phone,
                phone_shipping: data[0]?.phone,
                object_number_: data[0]?.object_number,
                object_number_billing: data[0]?.object_number,
                object_number_shipping: data[0]?.object_number,
                town_name_: data[0]?.town_name,
                town_name_billing: data[0]?.town_name,
                town_name_shipping: data[0]?.town_name,
                note: data[0]?.note,
                zip_code_: data[0]?.zip_code,
                zip_code_billing: data[0]?.zip_code,
                zip_code_shipping: data[0]?.zip_code,
              });
            },
          );
        }
      });
    };

    getDdlBilling();
  }, []);

  const renderCart = () => {
    if (isFetching) {
      return (
        <div
          className={`container mx-auto my-32 flex max-w-[80%] flex-col items-center justify-center px-2 2xl:px-[2rem] 3xl:px-[3rem] 4xl:px-[9.5rem]`}
        >
          <div className={`h-5 w-full animate-pulse bg-slate-300`} />
          <div className={`mt-10 h-5 w-full animate-pulse bg-slate-300`} />
          <div className={`h-5 w-full animate-pulse bg-slate-300`} />
          <div className={`mt-10 grid h-max w-full grid-cols-2 gap-10`}>
            <div className={`col-span-1 grid grid-cols-2 gap-5`}>
              {Array.from({ length: 8 })?.map((_, i) => {
                return (
                  <div
                    key={i}
                    className={`col-span-1 h-10 w-full animate-pulse bg-slate-300`}
                  ></div>
                );
              })}
            </div>
            <div className={`col-span-1 grid grid-cols-2 gap-5`}>
              {Array.from({ length: 8 })?.map((_, i) => {
                return (
                  <div
                    key={i}
                    className={`col-span-1 h-10 w-full animate-pulse bg-slate-300`}
                  ></div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    if (!isFetching && data?.items?.length > 0) {
      return (
        <>
          <Layout className={`py-5`}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className={`mt-5 md:mt-20 grid grid-cols-5 gap-[3.75rem]`}
            >
              <CheckoutData
                setFormData={setFormData}
                formData={formData}
                className={className}
                deliveryOptions={deliveryOptions}
                paymentOptions={paymentOptions}
                items={data?.items}
                refreshSummary={refreshSummary}
                summary={summary?.summary}
                options={summary?.summary?.options}
                totals={summary?.summary?.totals}
                refreshCart={refreshCart}
                errors={errors}
                setErrors={setErrors}
              />
            </form>
          </Layout>
          <Suspense>
            <ViewedProducts />
          </Suspense>
        </>
      );
    }

    if (!isFetching && data?.items?.length === 0) {
      return (
        <div
          className={`container mx-auto my-32 flex max-w-[80%] flex-col items-center justify-center px-2 2xl:px-[2rem] 3xl:px-[3rem] 4xl:px-[9.5rem]`}
        >
          <div
            className={`flex flex-col items-center justify-center gap-3 rounded-lg border p-6 text-center sm:p-10`}
          >
            <h2 className={`${className} text-2xl font-medium uppercase`}>
              Korpa je prazna
            </h2>
            <h3 className={`${className} text-[1rem] font-light`}>
              Dodajte proizvode u korpu kako biste nastavili sa kupovinom.
            </h3>
            <div className={`${className} text-[1rem] font-light`}>
              Povratak na{" "}
              <Link
                className={`${className} font-normal underline `}
                href={`/`}
              >
                početnu stranu
              </Link>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div
        className={`container mx-auto my-32 flex max-w-[80%] flex-col items-center justify-center px-2 2xl:px-[2rem] 3xl:px-[3rem] 4xl:px-[9.5rem]`}
      >
        <div className={`h-5 w-full animate-pulse bg-slate-300`} />
        <div className={`mt-10 h-5 w-full animate-pulse bg-slate-300`} />
        <div className={`h-5 w-full animate-pulse bg-slate-300`} />
        <div className={`mt-10 grid h-max w-full grid-cols-2 gap-10`}>
          <div className={`col-span-1 grid grid-cols-2 gap-5`}>
            {Array.from({ length: 8 })?.map((_, i) => {
              return (
                <div
                  key={i}
                  className={`col-span-1 h-10 w-full animate-pulse bg-slate-300`}
                ></div>
              );
            })}
          </div>
          <div className={`col-span-1 grid grid-cols-2 gap-5`}>
            {Array.from({ length: 8 })?.map((_, i) => {
              return (
                <div
                  key={i}
                  className={`col-span-1 h-10 w-full animate-pulse bg-slate-300`}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.CAPTCHAKEY}>
      <GoogleReCaptcha onVerify={verifyCaptcha} refreshReCaptcha={true} />
      {renderCart()}
    </GoogleReCaptchaProvider>
  );
};
