import { Static } from "@/_pages/static";
import { get } from "@/_api/api";

const getPage = (slug) => {
  return get(`/static-pages/content/${slug}`).then(
    (res) => res?.payload?.basic_data
  );
};

const StaticPage = ({ params: { slug } }) => {
  return <Static slug={slug} />;
};

export default StaticPage;

export const generateMetadata = async ({ params: { slug } }) => {
  const data = await getPage(slug);

  if (data) {
    const { name } = data;
    return {
      title: `${name ?? "404"} | Bogutovo`,
    };
  } else {
    return {
      title: `404 | Bogutovo`,
    };
  }
};
