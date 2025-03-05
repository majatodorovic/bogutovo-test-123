import { Layout } from "@/_components/ui/layout";
import Link from "next/link";
import Image from "next/image";
import { SelectCountry } from "@/_components/shared/footer/select-country";

export const Footer = () => {
  const payment_images = [
    {
      id: 1,
      src: `/icons/payments/1.png`,
    },
    {
      id: 2,
      src: `/icons/payments/2.png`,
    },
    {
      id: 3,
      src: `/icons/payments/3.png`,
    },
    {
      id: 4,
      src: `/icons/payments/4.png`,
    },
    {
      id: 5,
      src: `/icons/payments/5.png`,
    },
    {
      id: 6,
      src: `/icons/payments/6.png`,
    },
    {
      id: 7,
      src: `/icons/payments/7.png`,
    },
    {
      id: 8,
      src: `/icons/payments/8.png`,
    },
    {
      id: 9,
      src: `/icons/payments/9.png`,
    },
    {
      id: 10,
      src: `/icons/payments/10.png`,
    },
  ];
  const delivery_images = [
    {
      id: 1,
      src: `/icons/delivery/aks-logo.png`,
    },
  ];

  return (
    <>
      <div className={`py-[2rem] md:py-[4.375rem] bg-boa-dark-blue`}>
        <Layout>
          <div className={`grid grid-cols-6 gap-10 md:gap-20`}>
            <div className={`col-span-3 md:col-span-1`}>
              <h3 className={`text-white font-semibold text-lg`}>
                Korisnička podrška
              </h3>
              <Link
                href={`/strana/kako-kupiti`}
                className={`text-white font-light text-base mt-5 block hover:text-boa-red`}
              >
                Kako kupiti
              </Link>
              <Link
                href={`/strana/reklamacije`}
                className={`text-white font-light text-base block hover:text-boa-red`}
              >
                Reklamacije
              </Link>

              <Link
                href={`/strana/zamena-artikala`}
                className={`text-white font-light text-base block hover:text-boa-red`}
              >
                Zamena artikala
              </Link>
              <Link
                href={`/strana/pravo-na-odustajanje`}
                className={`text-white font-light text-base block hover:text-boa-red`}
              >
                Pravo na odustajanje
              </Link>
            </div>
            <div className={`col-span-3 md:col-span-1`}>
              <h3 className={`text-white font-semibold text-lg`}>O nama</h3>
              <Link
                href={`/o-nama`}
                className={`text-white font-light text-base mt-5 block hover:text-boa-red`}
              >
                Više o kompaniji
              </Link>
              <Link
                href={`/lokacije`}
                className={`text-white font-light text-base block hover:text-boa-red`}
              >
                Naše prodavnice
              </Link>
            </div>
            <div className={`col-span-3 md:col-span-1`}>
              <h3 className={`text-white font-semibold text-lg`}>
                Možda te interesuje
              </h3>
              <Link
                href={`/zene/zenske-spavacice`}
                className={`text-white font-light text-base mt-5 block hover:text-boa-red`}
              >
                Spavaćice
              </Link>
              <Link
                href={`/zene/zenski-donji-ves`}
                className={`text-white font-light text-base block hover:text-boa-red`}
              >
                Ženski veš
              </Link>
              <Link
                href={`/zene/zenske-pidzame`}
                className={`text-white font-light text-base block hover:text-boa-red`}
              >
                Ženske pidžame
              </Link>
              <Link
                href={`/muskarci/muske-pidzame`}
                className={`text-white font-light text-base block hover:text-boa-red`}
              >
                Muške pidžame
              </Link>
              <Link
                href={`/muskarci/muske-bokserice`}
                className={`text-white font-light text-base block hover:text-boa-red`}
              >
                Bokserice
              </Link>
            </div>
            <div className={`col-span-3 md:col-span-1`}>
              <h3 className={`text-white font-semibold text-lg`}>
                Informacije
              </h3>
              <Link
                href={`/strana/uslovi-koriscenja`}
                className={`text-white font-light text-base mt-5 block hover:text-boa-red`}
              >
                Uslovi korišćenja
              </Link>
              <Link
                href={`/strana/politika-privatnosti`}
                className={`text-white font-light text-base block hover:text-boa-red`}
              >
                Politika privatnosti
              </Link>
              <Link
                href={`/strana/isporuka`}
                className={`text-white font-light text-base block hover:text-boa-red`}
              >
                Isporuka
              </Link>
            </div>
            <div className={`hidden md:col-span-1`} />
            <div className={`col-span-6 md:col-span-1`}>
              <div className={`flex flex-col`}>
                <Link href={`/`} className={`max-md:w-[40%]`}>
                  <Image
                    src={`/images/footer-logo.png`}
                    alt={`Bogutovo`}
                    width={0}
                    height={0}
                    sizes={`100vw`}
                    quality={100}
                    className={`w-fit`}
                  />
                </Link>
                <div className={`flex flex-col gap-1 mt-5`}>
                  <p className={`font-light text-white`}>Načini dostave</p>
                  <div className={`flex items-center space-x-1`}>
                    {delivery_images?.map(({ id, src }) => {
                      return (
                        <Image
                          src={src}
                          alt={`Bogutovo`}
                          width={40}
                          height={50}
                          key={`delivery-${id}`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`flex flex-col md:flex-row items-start max-md:gap-5 md:items-center justify-between pt-[2rem]`}
          >
            {/*<SelectCountry />*/}
            <div
              className={`flex flex-col ml-auto md:flex-row items-start gap-5 md:gap-10`}
            >
              {/*<div className={`flex flex-col gap-1`}>*/}
              {/*  <p className={`font-light text-white`}>*/}
              {/*    Prihvaćeni načini plaćanja*/}
              {/*  </p>*/}
              {/*  <div className={`flex items-center space-x-1`}>*/}
              {/*    {payment_images?.map(({ id, src }) => {*/}
              {/*      return (*/}
              {/*        <Image*/}
              {/*          src={src}*/}
              {/*          alt={`Bogutovo`}*/}
              {/*          width={40}*/}
              {/*          height={50}*/}
              {/*          key={`payment-${id}`}*/}
              {/*        />*/}
              {/*      );*/}
              {/*    })}*/}
              {/*  </div>*/}
              {/*</div>*/}
            </div>
          </div>
        </Layout>
      </div>
      <div className={`py-3 bg-boa-dark`}>
        <Layout>
          <div className={`text-white font-normal text-base`}>
            © {new Date().getFullYear()} Bogutovo.com | Sva prava zadržana.
            Powered by{" "}
            <a
              target={`_blank`}
              href={`https://www.croonus.com`}
              className={`hover:text-boa-red`}
            >
              Croonus Technologies
            </a>
          </div>
        </Layout>
      </div>
    </>
  );
};
