import { Promo } from "@/_pages/promo";
import { get } from "@/_api/api";

const getPromoBasicData = (slug) => {
  return get(`/landing-pages/basic-data/${slug}`).then((res) => res?.payload);
};

const PromoPage = ({ params: { slug } }) => {
  return <Promo slug={slug} />;
};

export default PromoPage;

export const generateMetadata = async ({ params: { slug } }) => {
  const basic_data = await getPromoBasicData(slug);

  const removeHTMLTags = (str) => str.replace(/<[^>]*>?/gm, "");

  const image =
    basic_data?.image ??
    "https://api.bogutovo.croonus.com/croonus-uploads/config/b2c/logo-2b6b458b9d1f8f9e2e62bbf21e163160.png";

  return {
    title: `${basic_data?.name} | Bogutovo`,
    description: removeHTMLTags(basic_data?.description ?? "<>"),
    image: image,
    openGraph: {
      title: `${basic_data?.name} | Bogutovo`,
      description: removeHTMLTags(basic_data?.description ?? "<>"),
      images: [
        {
          url: image ?? "",
          width: 1200,
          height: 630,
          alt: basic_data?.name,
        },
      ],
    },
    robots: {
      follow: true,
      index: true,
    },
  };
};
