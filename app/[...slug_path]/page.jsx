import { get as GET } from "@/_api/api";
import { notFound, permanentRedirect } from "next/navigation";
import { Category } from "@/_dynamic_pages/category/category";
import { Product } from "@/_dynamic_pages/product/product";
import { getRobots, handleCategoryRobots } from "@/_functions";
import { headers } from "next/headers";

const handleData = async (slug) => {
  return await GET(`/slugs/product-categories?slug=${slug}`).then((res) => {
    return res?.payload;
  });
};

const fetchCategorySEO = async (slug) => {
  return await GET(`/categories/product/single/seo/${slug}`).then(
    (response) => {
      return response?.payload;
    },
  );
};

const getProductSEO = async (id) => {
  return await GET(`/product-details/seo/${id}`).then((response) => {
    return response?.payload;
  });
};

const CategoryProduct = async ({
  params: { slug_path: path },
  params,
  searchParams,
}) => {
  const str = path?.join("/");
  const data = await handleData(str);
  switch (true) {
    case data?.type === "category" &&
      data?.status === true &&
      data?.redirect_url === false:
      const base_url = headers().get("x-base_url");

      return (
        <Category
          params={params}
          searchParams={searchParams}
          category_id={data?.id}
          base_url={base_url}
        />
      );
    case data?.type === "product" &&
      data?.status === true &&
      data?.redirect_url === false:
      return (
        <Product
          id={data?.id}
          path={path}
          category_id={path?.[path?.length - 2] ?? "*"}
        />
      );
    case data?.status === false:
      return notFound();
    default:
      permanentRedirect(`/${data?.redirect_url}`);
  }
};

export default CategoryProduct;

const defaultMetadata = {
  title: "Početna | Bogutovo",
  description: "Dobrodošli na Bogutovo Online Shop",

  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Početna | Bogutovo",
    description: "Dobrodošli na Bogutovo Online Shop",
    type: "website",
    url: "https://bogutovo.com",
    image:
      "https://api.bogutovo.croonus.com/croonus-uploads/config/b2c/logo-2b6b458b9d1f8f9e2e62bbf21e163160.png",
    site_name: "bogutovo.com",
    locale: "sr_RS",
  },
};

export async function generateMetadata({
  params: { slug_path: path },
  searchParams: { filteri, sort, viewed, strana },
}) {
  const str = path?.join("/");
  const data = await handleData(str);
  const headersList = headers();
  let canonical = headersList?.get("x-pathname");

  switch (true) {
    case data?.status === false &&
      data?.type === null &&
      data?.id === null &&
      data?.redirect_url === false:
      return defaultMetadata;

    case data?.type === "category" &&
      data?.status &&
      data?.redirect_url === false:
      const category = await fetchCategorySEO(data?.id);
      if (category) {
        let {
          meta_title: title,
          meta_keywords: keywords,
          meta_description: description,
          meta_image: image,
          meta_canonical_link: canonical_link,
          meta_robots: robots,
          social: { share_title, share_description, share_image },
        } = category;
        return {
          title: title ?? "",
          description: description ?? "",
          keywords: keywords ?? "",
          image: image ?? "",
          alternates: {
            canonical: `${canonical_link ?? canonical}`,
          },
          openGraph: {
            title: `${share_title}` ?? "",

            description: share_description ?? "",
            images: [
              {
                url:
                  share_image ??
                  "https://api.bogutovo.croonus.com/croonus-uploads/config/b2c/logo-2b6b458b9d1f8f9e2e62bbf21e163160.png",
                width: 800,
                height: 600,
                alt: share_description ?? "",
                title: share_title ?? "",
                description: share_description ?? "",
              },
            ],
          },
          robots: handleCategoryRobots(strana, filteri, sort, viewed, robots),
        };
      } else {
        return defaultMetadata;
      }

    case data?.type === "product" &&
      data?.status &&
      data?.redirect_url === false:
      const productSEO = await getProductSEO(data?.id);

      let robots = getRobots(productSEO?.meta_robots);

      const image =
        productSEO?.meta_image ||
        "https://api.bogutovo.croonus.com/croonus-uploads/config/b2c/logo-2b6b458b9d1f8f9e2e62bbf21e163160.png";
      if (productSEO) {
        return {
          alternates: {
            canonical: `${productSEO?.meta_canonical_link ?? canonical}`,
          },
          description:
            `${productSEO?.meta_title} - ${productSEO?.meta_description}` ?? "",
          keywords: productSEO?.meta_keywords ?? "",
          openGraph: {
            title: `${productSEO?.meta_title}` ?? "",
            description: productSEO?.meta_description ?? "",
            type: "website",
            images: [
              {
                url: image,
                width: 800,
                height: 800,
                alt: productSEO?.meta_title ?? productSEO?.meta_description,
              },
            ],
          },
          robots: robots,
          title: `${productSEO?.meta_title}` ?? "",
        };
      } else {
        return defaultMetadata;
      }
  }
}
