import { Layout } from "@/_components/ui/layout";
import Image from "next/image";
import { Breadcrumbs } from "@/_components/shared/breadcrumbs";

const AboutUs = () => {
    return (
        <Layout className={``}>
            <div className={`ml-auto flex justify-start md:justify-end mt-5`}>
                <Breadcrumbs name={`O nama`} parents={[]} />
            </div>
            <h1 className={`text-[1.823rem] font-bold my-5`}>O nama</h1>
            <h2 className={`text-boa-red text-2xl font-semibold`}>Naša vizija</h2>
            <p className={`mt-2`}>
                Naša vizija je i da postanemo sinonim za kompaniju koja stalno postavlja
                više standarde kako u oblasti proizvodnje trikotažnih odevnih predmeta
                tako i u oblasti življenja – težimo ne samo da uvodimo nove navike i
                trendove vec i da ih predvidjamo i kreiramo.
            </p>
            <h2 className={`text-boa-red mt-10 text-2xl font-semibold`}>
                Naš zadatak
            </h2>
            <p className={`mt-2`}>
                Naš zadatak je da u sektoru proizvodnje trikotažnih odevnih predmeta
                kupcima obezbedimo najkvalitetnije proizvode koji ce podići nivo
                njihovog komfora i samopouzdanja!
            </p>

            <div
                className={`grid px-2 md:px-10 grid-cols-2 place-items-center mt-10 py-5 md:py-10 bg-[#f5f5f7] gap-5 md:gap-10`}
            >
                <div className={`col-span-2 md:col-span-1`}>
                    <h3 className={`text-boa-red text-4xl font-semibold mt-10`}>
                        Ko smo mi
                    </h3>
                    <p className={`mt-2`}>
                        BOA je modni brend osnovan 1996. godine koji ima dugu porodičnu
                        tradiciju u proizvodnji donjeg rublja. Nekada je to bila mala radnja
                        sa tri mašine, a sada, 29 godina kasnije, imamo značajne proizvodne
                        kapacitete i potrebno iskustvo u proizvodnji programa donjeg veša i
                        odeće za spavanje za žene, muškarce i decu. Konstantno i
                        sveobuhvatno prateći glas tržišta, prateći modne trendove, tim
                        dizajnera kreira kolekcije koje udovoljavaju ukusima najzahtjevnijih
                        potrošača. Danas se naša kompanija fokusira uglavnom na marketinški
                        pristup s ciljem postizanja većeg prepoznavanja našeg brenda BOA,
                        koji želimo da razvijemo na globalnom nivou.
                    </p>
                </div>
                <div className={`col-span-2 md:col-span-1`}>
                    <Image
                        src={`/images/o-nama.webp`}
                        alt={`Bogutovo`}
                        width={500}
                        height={500}
                        className={`w-full h-auto`}
                        quality={100}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default AboutUs;


export const metadata = {
    title: "O nama | Bogutovo",
};