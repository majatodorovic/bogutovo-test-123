"use client";

import { useEffect, useState } from "react";
import {
  useBillingAddresses,
  useCheckout,
  useForm,
  useGetAddress,
  useIsLoggedIn,
  useRemoveFromCart,
} from "@/_hooks/ecommerce.hooks";
import { handleCreditCard, handleSetData } from "@/_components/cart/functions";
import { useRouter } from "next/navigation";
import { PromoCode } from "@/_components/cart/PromoCode";
import {
  CheckboxInput,
  Form,
  handleResetErrors,
  SelectInput,
  handleInputChange,
} from "@/_components/shared/form";
import Image from "next/image";
import CheckoutUserInfo from "@/_components/cart/CheckoutUserInfo";
import CheckoutOptions from "@/_components/cart/CheckoutOptions";
import CheckoutTotals from "@/_components/cart/CheckoutTotals";
import CheckoutItems from "@/_components/cart/CheckoutItems";

import Link from "next/link";
import fields from "./shipping.json";
import { Spinner } from "@/_components/ui/spinner";
import { pushToDataLayer } from "@/_services/data-layer";

export const CheckoutData = ({
  className,
  formData,
  setFormData,
  payment_options,
  delivery_options,
  summary,
  items,
  options,
  totals,
  refreshCart,
  refreshSummary,
  token,
}) => {
  const {
    data: dataTmp,
    setData: setDataTmp,
    errors: errorsTmp,
    setErrors: setErrorsTmp,
  } = useForm(formData);

  const [selected, setSelected] = useState({
    id: null,
    use_same_data: true,
  });

  const { data: loggedIn } = useIsLoggedIn();

  const { data: billing_addresses } = useBillingAddresses(loggedIn);

  const { data: form, isLoading } = useGetAddress(
    billing_addresses?.length > 1 ? selected?.id : billing_addresses?.[0]?.id,
    "billing",
    loggedIn && Boolean(billing_addresses?.length),
  );

  const [postErrors, setPostErrors] = useState({
    fields: [],
  });

  const [isClosed, setIsClosed] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    data,
    mutate: checkOut,
    isPending,
    isSuccess: isCheckoutSuccess,
    status,
  } = useCheckout({
    formData: dataTmp,
    setPostErrors: setPostErrors,
    setLoading: setLoading,
  });

  const [required, setRequired] = useState([
    "payment_method",
    "delivery_method",
    "first_name_shipping",
    "last_name_shipping",
    "phone_shipping",
    "email_shipping",
    "address_shipping",
    "town_name_shipping",
    "zip_code_shipping",
    "object_number_shipping",
    "accept_rules",
    "first_name_billing",
    "last_name_billing",
    "phone_billing",
    "email_billing",
    "address_billing",
    "town_name_billing",
    "zip_code_billing",
    "object_number_billing",
  ]);

  useEffect(() => {
    if (formData?.delivery_method === "in_store_pickup") {
      setRequired((prevRequired) => [
        ...prevRequired,
        "delivery_method_options",
      ]);
    } else {
      setRequired((prevRequired) =>
        prevRequired.filter((item) => item !== "delivery_method_options"),
      );
    }
  }, [formData?.delivery_method]);

  const router = useRouter();

  const filterOutProductsOutOfStock = (data) => {
    const productsOutOfStock = [];
    data?.forEach((item) => {
      if (!item?.product?.inventory?.inventory_defined) {
        productsOutOfStock.push({
          cart: {
            id: null,
            cart_item_id: item?.cart?.cart_item_id,
          },
          product: {
            name: item?.product?.basic_data?.name,
            sku: item?.product?.basic_data?.sku,
            slug: item?.product?.slug,
            image: item?.product?.image,
            id: item?.product?.id,
          },
        });
      }
    });
    setPostErrors((prevErrors) => ({
      ...prevErrors,
      fields: productsOutOfStock,
    }));
  };

  useEffect(() => {
    if (items && !isClosed) {
      filterOutProductsOutOfStock(items);
    }
  }, [items]);

  const { mutate: removeFromCart, isSuccess } = useRemoveFromCart();

  useEffect(() => {
    if (isSuccess) {
      refreshCart();
      refreshSummary();
    }
  }, [isSuccess, refreshSummary]);

  useEffect(() => {
    if (isCheckoutSuccess && !data?.fields) {
      switch (true) {
        case Boolean(data?.payment_provider_data?.form) === false:
          return router.push(`/korpa/kupovina/${data?.order?.order_token}`);
        case Boolean(data?.payment_provider_data?.form) === true:
          return handleCreditCard(data);
        default:
          break;
      }
    } else {
      if (data?.fields) {
        setPostErrors({
          fields: data?.fields,
        });
      }
    }
  }, [isCheckoutSuccess, data, router]);

  useEffect(() => {
    handleSetData("default_data", form, dataTmp, setDataTmp);
  }, [selected?.id, form?.[0], isLoading]);

  useEffect(() => {
    if (selected?.use_same_data) {
      return handleSetData("same_data", form, dataTmp, setDataTmp);
    } else {
      return handleSetData("different_data", form, dataTmp, setDataTmp);
    }
  }, [selected?.id, selected?.use_same_data, isLoading]);

  useEffect(() => {
    setRequired((prevRequired) =>
      selected?.use_same_data
        ? prevRequired.filter(
            (item) =>
              item !== "floor_shipping" && item !== "apartment_number_shipping",
          )
        : [...prevRequired, "floor_shipping", "apartment_number_shipping"],
    );
  }, [selected?.use_same_data]);

  const show_options = process.env.SHOW_CHECKOUT_SHIPPING_FORM;

  return (
    <div className={`mt-5 grid grid-cols-5 gap-[3.75rem]`}>
      <div className={`col-span-5 flex flex-col lg:col-span-3`}>
        {billing_addresses?.length > 1 && (
          <SelectInput
            className={`!w-fit`}
            errors={errorsTmp}
            placeholder={`Izaberite adresu plaćanja`}
            options={billing_addresses}
            onChange={(e) => {
              if (e.target.value !== "none") {
                setSelected((prev) => ({
                  ...prev,
                  id: e.target.value,
                }));
                handleResetErrors(setErrorsTmp);
              }
            }}
            value={selected?.id}
          />
        )}
        <CheckoutUserInfo
          errors={errorsTmp}
          selected={selected}
          setErrors={setErrorsTmp}
          setFormData={setDataTmp}
          formData={dataTmp}
          className={className}
          items={items}
          refreshCart={refreshCart}
          refreshSummary={refreshSummary}
        />

        {show_options === "true" && (
          <CheckboxInput
            className={`mb-5`}
            placeholder={`Koristi iste podatke za dostavu i naplatu`}
            onChange={(e) => {
              setSelected((prev) => ({
                ...prev,
                use_same_data: e.target.checked,
              }));
            }}
            value={selected?.use_same_data}
            required={false}
          />
        )}

        {show_options === "true" && !selected?.use_same_data && (
          <Form
            className={`grid grid-cols-2 gap-x-5`}
            data={dataTmp}
            errors={errorsTmp}
            fields={fields}
            isPending={isPending}
            handleSubmit={() => {}}
            showOptions={false}
            handleInputChange={(e) => {
              if (e?.target?.name === "id_country_shipping") {
                handleInputChange(e, setDataTmp, setErrorsTmp);
                setDataTmp((prev) => ({
                  ...prev,
                  country_name_shipping: e?.target?.selectedOptions[0]?.text,
                }));
              } else {
                handleInputChange(e, setDataTmp, setErrorsTmp);
              }
            }}
            buttonClassName={"!hidden"}
          />
        )}

        <CheckoutOptions
          errors={errorsTmp}
          setErrors={setErrorsTmp}
          delivery_options={delivery_options}
          payment_options={payment_options}
          setFormData={setDataTmp}
          formData={dataTmp}
          className={className}
          summary={summary}
          options={options}
          totals={totals}
        />
      </div>

      <div className={`col-span-5 flex flex-col gap-3 lg:col-span-2`}>
        <div
          className={`customScroll mb-16 flex max-h-[400px] flex-col gap-5 overflow-y-auto sm:mb-10`}
        >
          {(items ?? [])?.map(
            ({
              product: {
                basic_data: { id_product, name, sku },
                price,
                inventory,
                image,
                link: { link_path: slug_path },
              },
              cart: { quantity, cart_item_id },
            }) => (
              <CheckoutItems
                key={id_product}
                id={id_product}
                image={image}
                sku={sku}
                inventory={inventory}
                slug_path={slug_path}
                refreshCart={refreshCart}
                name={name}
                price={price}
                isClosed={isClosed}
                refreshSummary={refreshSummary}
                quantity={quantity}
                cart_item_id={cart_item_id}
              />
            ),
          )}
        </div>
        <PromoCode />
        <h2 className="text-xl font-bold ">Vrednost Vaše korpe</h2>

        <div className={`bg-[#f7f7f7] p-3`}>
          <CheckoutTotals
            totals={totals}
            options={options}
            summary={summary}
            className={className}
            formData={dataTmp}
          />
        </div>
        <div className={`flex flex-col gap-0`}>
          <div className={`mt-2 flex gap-3 relative`}>
            <input
              type="checkbox"
              id="accept_rules"
              name="accept_rules"
              onChange={(e) => {
                setDataTmp({
                  ...dataTmp,
                  accept_rules: e?.target?.checked,
                });
                setErrorsTmp(
                  errorsTmp?.filter((error) => error !== "accept_rules"),
                );
              }}
              checked={dataTmp?.accept_rules}
              className="focus:ring-0 focus:border-none rounded-full focus:outline-none text-[#191919] bg-white"
            />
            <label
              htmlFor="agreed"
              className={` text-[0.965rem] font-light ${className}  underline`}
            >
              Saglasan sam sa
              <a
                className={`underline max-md:text-[1.15rem]`}
                href={`/strana/uslovi-koriscenja`}
                target={`_blank`}
              >
                <span> Opštim uslovima korišćenja</span>
              </a>{" "}
              BOGUTOVO ONLINE SHOP-a.
            </label>
          </div>
          {errorsTmp?.includes("accept_rules") && (
            <p className="text-red-500 text-sm mt-2">
              Molimo Vas da prihvatite uslove korišćenja.
            </p>
          )}
        </div>
        <button
          disabled={isPending}
          className={`mt-2 w-full ${
            isPending && "!bg-white !text-black opacity-50"
          } bg-boa-dark hover:bg-boa-red/80 text-white font-medium py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-boa-red sm:text-base shadow transition-all duration-300 ${className}`}
          onClick={() => {
            let err = [];
            (required ?? [])?.forEach((key) => {
              if (!dataTmp[key] || dataTmp[key]?.length === 0) {
                err.push(key);
              }
            });
            setErrorsTmp(err);
            if (err?.length === 0) {
              setDataTmp({
                ...dataTmp,
                gcaptcha: token,
              });

              pushToDataLayer("begin_checkout", items);

              const timeout = setTimeout(() => {
                checkOut();
              }, 100);

              return () => clearTimeout(timeout);
            } else {
              window.scrollTo(0, 0);
            }
          }}
        >
          {isPending ? "OBRADA..." : "ZAVRŠI KUPOVINU"}
        </button>
      </div>
      <NoStockModal
        className={className}
        postErrors={postErrors}
        setPostErrors={setPostErrors}
        removeFromCart={removeFromCart}
        setIsClosed={setIsClosed}
      />
      {isCheckoutSuccess && data?.credit_card === null && loading && (
        <div
          className={`fixed left-0 top-0 z-[100] flex h-[100dvh] w-screen flex-col items-center justify-center bg-black/50 opacity-100 backdrop-blur-md transition-all duration-500`}
        >
          <Spinner className={`!scale-125`} />
        </div>
      )}
    </div>
  );
};

const NoStockModal = ({
  postErrors,
  setPostErrors,
  removeFromCart,
  setIsClosed,
  className,
}) => {
  return (
    <div
      onClick={(e) => {}}
      className={
        postErrors?.fields?.length > 0
          ? `visible fixed left-0 top-0 z-[100] flex h-[100dvh] w-screen flex-col items-center justify-center bg-black/50 opacity-100 backdrop-blur-md transition-all duration-500`
          : `invisible fixed left-0 top-0 z-[100] flex h-[100dvh] w-screen flex-col items-center justify-center bg-black/50 opacity-0 backdrop-blur-md transition-all duration-500`
      }
    >
      <div
        className={`relative inset-0 m-auto h-fit w-fit rounded-md bg-white p-[1rem] max-sm:mx-2`}
      >
        <div className={`mt-[3rem] px-[0.25rem] md:px-9`}>
          <h3 className={`mt-4 text-center text-xl font-semibold ${className}`}>
            U korpi su proizvodi koji trenutno nisu na stanju.
          </h3>
          <p className={`mt-2 text-center text-base font-normal ${className}`}>
            Kako bi završili porudžbinu, morate izbrisati sledeće artikle iz
            korpe:
          </p>
          <div
            className={`divide-y-black mt-[0.85rem] flex flex-col divide-y px-5`}
          >
            {(postErrors?.fields ?? [])?.map(
              ({
                cart: { id, cart_item_id },
                product: { id: id_product, name, sku, slug, image },
                errors,
              }) => {
                let deleted_items_count = 0;
                //ako je deleted_items_count jednak broju proizvoda koji nisu na lageru, gasimo modal
                if (deleted_items_count === postErrors?.fields?.length) {
                  setPostErrors(null);
                }

                return (
                  <div
                    key={id}
                    className={`flex items-start gap-2 py-[1.55rem]`}
                  >
                    <Link href={`/${slug}`}>
                      <Image
                        src={image?.[0]}
                        alt={name ?? sku ?? slug ?? "Ecommerce"}
                        width={150}
                        height={100}
                        className={``}
                      />
                    </Link>
                    <div className={`flex flex-col`}>
                      <Link
                        href={`/${slug}`}
                        className={`text-sm font-normal ${className}`}
                      >
                        {name}
                      </Link>
                      <ul className={`flex flex-col gap-1`}>
                        {(errors ?? ["Trenutno nije na stanju."])?.map(
                          (error) => (
                            <li
                              key={error}
                              className={`text-[13px] font-bold text-[#e10000] ${className}`}
                            >
                              {error}
                            </li>
                          ),
                        )}
                      </ul>
                      <button
                        onClick={async () => {
                          await removeFromCart({ id: cart_item_id });
                          //nakon brisanja, iz postErrors.fields filtriramo taj item i izbacujemo ga
                          let arr = [];
                          arr = (postErrors?.fields ?? [])?.filter(
                            (item) => item.product.id !== id_product,
                          );
                          setPostErrors({
                            ...postErrors,
                            fields: arr,
                          });
                        }}
                        className={`mt-1 flex w-[10rem] items-center justify-between bg-[#000] px-2 py-[0.225rem] font-normal text-white transition-all duration-300 hover:bg-[#e10000] hover:bg-opacity-80 ${className}`}
                      >
                        Ukloni iz korpe{" "}
                        <i className="fa-solid fa-trash ml-auto"></i>
                      </button>
                    </div>
                  </div>
                );
              },
            )}
          </div>
        </div>
        <div className={`mt-2 flex items-center justify-end`}>
          <button
            className={`ml-auto mt-1 flex items-center justify-between bg-[#000] px-12 py-2 text-center font-normal text-white transition-all duration-300 hover:bg-[#e10000] hover:bg-opacity-80 ${className}`}
            onClick={() => {
              setPostErrors(null);
              setIsClosed(true);
            }}
          >
            Zatvori
          </button>
        </div>
      </div>
    </div>
  );
};
