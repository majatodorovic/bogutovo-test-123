import { headers } from "next/headers";
import { get, list } from "@/_api/api";
import { CheckoutPage } from "@/_components/CheckoutPage/CheckoutPage";
import { Suspense } from "react";
import { CartLoader } from "@/_components/cart/cart-loader";

const getPaymentOptions = async () => {
  return await get("/checkout/payment-options").then(
    (response) => response?.payload,
  );
};
const getDeliveryOptions = async () => {
  return await get("/checkout/delivery-options").then(
    (response) => response?.payload,
  );
};
const getRecommendedProducts = async () => {
  return await list("/products/section/list/recommendation").then(
    (res) => res?.payload?.items,
  );
};
const getCountries = async () => {
  return await get(`/checkout/ddl/id_country`).then((res) => res?.payload);
};

const Cart = async () => {
  const [payment_options, delivery_options, recommended_products, countries] =
    await Promise.all([
      getPaymentOptions(),
      getDeliveryOptions(),
      getRecommendedProducts(),
      getCountries(),
    ]);

  return (
    <Suspense fallback={<CartLoader />}>
      <CheckoutPage
        payment_options={payment_options}
        delivery_options={delivery_options}
        recommendedProducts={recommended_products}
        countries={countries}
      />
    </Suspense>
  );
};

export default Cart;

export const revalidate = 30;

export const generateMetadata = async () => {
  const header_list = headers();
  let canonical = header_list?.get("x-pathname");
  return {
    title: `Korpa | Bogutovo`,
    description: "Dobrodošli na Bogutovo Online Shop",
    alternates: {
      canonical: canonical,
    },
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: `Korpa | Bogutovo`,
      description: "Dobrodošli na Bogutovo Online Shop",
      type: "website",
      images: [
        {
          width: 800,
          height: 600,
          alt: "Bogutovo",
        },
      ],
      locale: "sr_RS",
    },
  };
};
