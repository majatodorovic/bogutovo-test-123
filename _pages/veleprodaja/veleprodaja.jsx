"use client";

import { Layout } from "@/_components/ui/layout";
import { icons } from "@/_lib/icons";
import { Breadcrumbs } from "@/_components/shared/breadcrumbs";

export const Veleprodaja = () => {
  return (
    <Layout>
      <div className={`ml-auto flex justify-start md:justify-end mt-5`}>
        <Breadcrumbs name={`Veleprodaja`} parents={[]} />
      </div>
      <h1 className={`text-[1.823rem] font-bold my-5`}>Veleprodaja</h1>
      <h2 className={`text-boa-red text-2xl font-semibold`}>Pozovite nas</h2>
      <div className={`mt-5 flex flex-col gap-4`}>
        <div className={`flex items-center gap-3`}>
          {icons.pin}{" "}
          <div>
            Adresa: d.o.o.{" "}
            <a
              className={`underline`}
              href={`https://www.google.com/maps/place/Bogutovo+doo/@43.7488063,20.1068217,17z/data=!3m1!4b1!4m6!3m5!1s0x475783cb52c53a2f:0x3a2a3ae92159df4c!8m2!3d43.7488063!4d20.1093966!16s%2Fg%2F11fqcdjf3s?entry=ttu`}
              target={`_blank`}
            >
              Bogutovo Šantićeva b.b 31230 Arilje
            </a>
          </div>
        </div>
        <div className={`flex items-center gap-3`}>
          {icons.phone} Telefon:{" "}
          <a className={`hover:underline`} href={`tel:+381 31 3891 111`}>
            +381 31 3891 111
          </a>{" "}
          <a className={`hover:underline`} href={`tel:+381 31 3896 757`}>
            +381 31 3896 757
          </a>
        </div>
        <div className={`flex items-center gap-3`}>
          {icons.printer} Fax:{" "}
          <a href={`tel:+381 31 3894 777`} className={`hover:underline`}>
            +381 31 3894 777
          </a>
        </div>
        <div className={`flex items-center gap-3`}>
          {icons.mail} Email:{" "}
          <a
            className={`hover:underline`}
            href={`mailto:komercijala@bogutovo.com`}
          >
            komercijala@bogutovo.com
          </a>
        </div>
      </div>
      <div className={`mt-5 flex flex-col gap-2`}>
        <h2 className={`text-boa-red text-2xl font-semibold`}>Radno vreme</h2>
        <div className={`flex items-center gap-3`}>
          {icons.clock} Ponedeljak - Petak 07:00 do 15:00
        </div>
        <div className={`flex items-center gap-3`}>
          {icons.clock} Subota - 07:00 do 14:00
        </div>
        <div className={`flex items-center gap-3`}>
          {icons.clock} Nedelja - Zatvoreno
        </div>
      </div>
    </Layout>
  );
};
