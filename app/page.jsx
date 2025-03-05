import { get, get as GET, list as LIST } from "@/_api/api";
import { BannerSlider as Banners } from "@/_components/banner-slider";
import { Layout } from "@/_components/ui/layout";
import { Slider } from "@/_components/ui/slider";
import { Suspense } from "react";
import { headers } from "next/headers";
import { generateOrganizationSchema } from "@/_functions";

const getBannersDesktop = () => {
  return GET("/banners/index_slider").then((res) => res?.payload);
};
const getBannersMobile = () => {
  return GET("/banners/index_slider_mobile").then((res) => res?.payload);
};
const getRecommendedProducts = () => {
  return LIST("/products/section/list/recommendation", {
    render: false,
  }).then((res) => res?.payload);
};
const getRecommendedCategories = () => {
  return LIST("/categories/section/recommended").then((res) => res?.payload);
};
const getFeaturedBanners = () => {
  return GET("/banners/izdvojeni_baner").then((res) => res?.payload);
};
const getFeaturedBannersMobile = () => {
  return GET("/banners/izdvojeni_baner_na_telefonu").then(
    (res) => res?.payload
  );
};
const getTopSellers = () => {
  return LIST("/products/section/list/top_sellers", {
    render: false,
  }).then((res) => res?.payload);
};

const Home = async () => {
  const [
    banners_desktop,
    banners_mobile,
    recommended_products,
    recommended_categories,
    featured_banners,
    featured_banners_mobile,
    top_sellers,
  ] = await Promise.all([
    getBannersDesktop(),
    getBannersMobile(),
    getRecommendedProducts(),
    getRecommendedCategories(),
    getFeaturedBanners(),
    getFeaturedBannersMobile(),
    getTopSellers(),
  ]);

  const base_url = headers().get("x-base_url");
  const schema = generateOrganizationSchema(base_url);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Banners
        banners={{
          desktop: banners_desktop,
          mobile: banners_mobile,
        }}
      />
      {recommended_products?.items?.length > 0 && (
        <Layout className={`mt-[2rem] md:mt-[6.125rem]`}>
          <Suspense
            fallback={
              <div className={`h-[15rem] w-full bg-slate-200 animate-pulse`} />
            }
          >
            <Slider
              title={`Neodoljiva ponuda za nju`}
              items={recommended_products?.items}
              type={"products"}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
                1280: {
                  slidesPerView: 5,
                },
              }}
              slidesPerView={1.5}
              rewind={true}
              spaceBetween={25}
            />
          </Suspense>
        </Layout>
      )}
      {recommended_categories?.length > 0 && (
        <Suspense
          fallback={
            <div className={`h-[15rem] w-full bg-slate-200 animate-pulse`} />
          }
        >
          <Slider
            type={"categories"}
            title={`Izdvojene kategorije`}
            items={recommended_categories}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1280: {
                slidesPerView: 2.7,
              },
            }}
            slidesPerView={1}
            rewind={true}
            spaceBetween={25}
          />
        </Suspense>
      )}
      {featured_banners?.length > 0 && (
        <div className={`mt-[2rem] md:mt-[6.125rem`}>
          <Banners
            type={`featured`}
            banners={{
              desktop: featured_banners,
              mobile: featured_banners_mobile,
            }}
          />
        </div>
      )}
      {top_sellers?.items?.length > 0 && (
        <Layout className={`mt-[2rem] md:mt-[6.125rem]`}>
          <Suspense
            fallback={
              <div className={`h-[15rem] w-full bg-slate-200 animate-pulse`} />
            }
          >
            <Slider
              title={`Neodoljiva ponuda za njega`}
              items={top_sellers?.items}
              type={"products"}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
                1280: {
                  slidesPerView: 5,
                },
              }}
              slidesPerView={1.5}
              rewind={true}
              spaceBetween={25}
            />
          </Suspense>
        </Layout>
      )}
    </main>
  );
};

export default Home;

export const revalidate = 30;

const getSEO = () => {
  return get("/homepage/seo").then((response) => response?.payload);
};

export const generateMetadata = async () => {
  const data = await getSEO();
  const header_list = headers();
  let canonical = header_list.get("x-pathname");
  return {
    title: data?.meta_title ?? "Početna | Bogutovo",
    description: data?.meta_description ?? "Dobrodošli na Bogutovo Online Shop",
    alternates: {
      canonical: data?.meta_canonical_link ?? canonical,
    },
    robots: {
      index: data?.meta_robots?.index ?? true,
      follow: data?.meta_robots?.follow ?? true,
    },
    openGraph: {
      title: data?.social?.share_title ?? "Početna | Bogutovo",
      description:
        data?.social?.share_description ?? "Dobrodošli na Bogutovo Online Shop",
      type: "website",
      images: [
        {
          url:
            data?.social?.share_image ??
            "https://api.bogutovo.croonus.com/croonus-uploads/config/b2c/logo-2b6b458b9d1f8f9e2e62bbf21e163160.png",
          width: 800,
          height: 600,
          alt: "Bogutovo",
        },
      ],
      locale: "sr_RS",
    },
  };
};
