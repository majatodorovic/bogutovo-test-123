import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";
import { Suspense, useEffect, useState } from "react";
import { Layout } from "@/_components/ui/layout";
import { Slider } from "@/_components/ui/slider";

export const TemplateOne = ({ verifyCaptcha, data, cartCost, children }) => {
  const [viewedProducts, setViewedProducts] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const viewed = localStorage.getItem("viewed_products");
      if (viewed) {
        setViewedProducts(JSON.parse(viewed));
      }
    }
  }, []);

  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.CAPTCHAKEY}>
      <GoogleReCaptcha onVerify={verifyCaptcha} refreshReCaptcha={true} />
      <div className="mx-auto text-sm 4xl:container mt-[1rem] lg:mt-[4rem] placeholder">
        <>
          <div className="grid grid-cols-5 gap-y-3 gap-x-3 max-xl:mx-auto max-xl:w-[95%] xl:mx-[5rem] ">
            <div className="col-span-5 bg-white p-1 max-xl:row-start-1">
              <div className={`flex items-center justify-between`}>
                <h2 className="text-xl font-bold ">Informacije</h2>
              </div>
              {children}
            </div>
          </div>
          {viewedProducts?.length > 0 && (
            <Layout className={`mt-[2rem] md:mt-[6.125rem]`}>
              <Suspense
                fallback={
                  <div
                    className={`h-[15rem] w-full bg-slate-200 animate-pulse`}
                  />
                }
              >
                <Slider
                  title={`Gledali ste i ove modele`}
                  items={viewedProducts}
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
        </>
      </div>
    </GoogleReCaptchaProvider>
  );
};
