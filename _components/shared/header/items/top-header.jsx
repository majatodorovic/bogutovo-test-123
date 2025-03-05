import { Layout } from "@/_components/ui/layout";

export const TopHeader = () => {
  return (
    <div className={`bg-boa-dark py-1`}>
      <Layout>
        <p
          className={`text-right max-md:mx-auto max-md:text-center ml-auto text-white font-light`}
        >
          Besplatna isporuka za iznos preko 4.000 RSD
        </p>
      </Layout>
    </div>
  );
};
