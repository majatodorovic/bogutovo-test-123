import { Layout } from "@/_components/ui/layout";
import { Breadcrumbs } from "@/_components/shared/breadcrumbs";
import Link from "next/link";
import { Button } from "@/_components/shared/button";

const NotFound = () => {
  return (
    <Layout>
      <title>404 | Bogutovo</title>
      <meta name="description" content="Stranica nije pronadjena" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <div className={`ml-auto flex justify-start md:justify-end mt-5`}>
        <Breadcrumbs name={`404`} parents={[]} />
      </div>

      <h1 className={`text-[1.823rem] font-bold my-5`}>
        Stranica nije pronadjena
      </h1>
      <p>Molimo vas da proverite da li ste uneli ispravnu adresu.</p>
      <Link href={`/`}>
        <Button className={`mt-5`}>Povratak na početnu stranu</Button>
      </Link>
    </Layout>
  );
};

export default NotFound;
