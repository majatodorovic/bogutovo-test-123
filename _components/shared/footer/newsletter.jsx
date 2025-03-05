import { Layout } from "@/_components/ui/layout";
import { NewsletterForm } from "@/_components/shared/footer";
import Link from "next/link";
import Image from "next/image";

export const Newsletter = () => {
  return (
    <div className={`bg-boa-blue mt-10 py-[2.7rem]`}>
      <Layout isAnchored={false}>
        <div className={`grid grid-cols-2 gap-10 md:gap-20`}>
          <div className={`col-span-2 md:col-span-1`}>
            <div
              className={`flex flex-col md:flex-row items-center gap-10 md:gap-20`}
            >
              <div className={`flex flex-col gap-2 max-md:text-center`}>
                <h3 className={`font-semibold text-[1.302rem] text-white`}>
                  Prijavite se na newsletter
                </h3>
              </div>
              <NewsletterForm />
            </div>
          </div>
          <div className={`col-span-2 md:col-span-1 self-center`}>
            <div className={`flex max-md:justify-center items-center gap-6`}>
              <p className={`text-white font-light text-[1rem]`}>Pratite nas</p>
              <div className={`flex items-center gap-3`}>
                <Link
                  target={`_blank`}
                  href={`https://www.instagram.com/boa.underwear/`}
                  className={`h-[45px] w-[45px] hover:bg-boa-dark group flex flex-col items-center justify-center bg-[#c6cbcd] rounded-full`}
                >
                  <Image
                    src={`/icons/instagram.png`}
                    alt={`Bogutovo instagram`}
                    width={23}
                    height={23}
                    className={`group-hover:invert`}
                  />
                </Link>
                <Link
                  href={`https://www.youtube.com/@boabogutovo3726`}
                  target={`_blank`}
                  className={`h-[45px] w-[45px] hover:bg-boa-dark group flex flex-col items-center justify-center bg-[#c6cbcd] rounded-full`}
                >
                  <Image
                    src={`/icons/youtube.png`}
                    alt={`Bogutovo youtube`}
                    width={23}
                    height={23}
                    className={`group-hover:invert`}
                  />
                </Link>
                <Link
                  href={`https://www.facebook.com/p/Boa-Underwear-100063537879998/?locale=sr_RS`}
                  target={`_blank`}
                  className={`h-[45px] w-[45px] hover:bg-boa-dark group flex flex-col items-center justify-center bg-[#c6cbcd] rounded-full`}
                >
                  <Image
                    src={`/icons/facebook.png`}
                    alt={`Bogutovo facebook`}
                    width={23}
                    height={23}
                    className={`group-hover:invert`}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};
