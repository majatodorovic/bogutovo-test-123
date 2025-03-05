"use client";

import { Layout } from "@/_components/ui/layout";
import { Breadcrumbs } from "@/_components/shared/breadcrumbs";
import Link from "next/link";
import { Button } from "@/_components/shared/button";

export default function Error({ reset }) {
  return (
    <Layout>
      <title>Greška | Bogutovo</title>
      <meta name="description" content="Došlo je do nepoznate greške" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <div className={`ml-auto flex justify-start md:justify-end mt-5`}>
        <Breadcrumbs name={`Greška`} parents={[]} />
      </div>

      <h1 className={`text-[1.823rem] font-bold my-5`}>
        Došlo je do nepoznate greške
      </h1>
      <p>Molimo vas da proverite da li ste uneli ispravnu adresu.</p>
      <div className={`flex items-center gap-5 mt-5`}>
        <Link href={`/`}>
          <Button>Povratak na početnu stranu</Button>
        </Link>
        <Button onClick={reset}>Pokušaj ponovo</Button>
      </div>
    </Layout>
  );
}
