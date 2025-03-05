"use client";
import { useEffect, useState, useCallback } from "react";
import {
  GoogleReCaptchaProvider as Provider,
  GoogleReCaptcha as ReCaptcha,
} from "react-google-recaptcha-v3";
import { post as POST } from "@/_api/api";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { icons } from "@/_lib/icons";
import { Layout } from "@/_components/ui/layout";
import { Breadcrumbs } from "@/_components/shared/breadcrumbs";
import { pushToDataLayer } from "@/_services/data-layer";
import { useSearchParams } from "next/navigation";
import { get, post } from "@/_api/api";

export const Contact = () => {
  const [token, setToken] = useState();
  //
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  //
  const [errors, setErrors] = useState([]);
  //
  const [product, setProduct] = useState(null);
  const params = useSearchParams();
  const slug = params.get("slug");
  const [loading, setLoading] = useState(false);
  //
  const requiredFields = [
    "customer_name",
    "phone",
    "email",
    "subject",
    "message",
    "accept_rules",
  ];
  //
  const verifyCaptcha = useCallback((token) => {
    setToken(token);
  }, []);
  //
  const [formData, setFormData] = useState({
    page_section: "contact_page",
    customer_name: "",
    phone: "",
    email: "",
    mail_to: "",
    subject: "",
    company_sector: "",
    message: "",
    accept_rules: false,
    gcaptcha: token,
    product_url: "",  // Dodajte ovo polje za URL proizvoda
  });
  //
  useEffect(() => {
    if (slug) {
      const getProduct = async (slug) => {
        const getProduct = await get(
          `/product-details/basic-data/${slug}`,
        ).then((res) => {
          setProduct(res?.payload);

          // Pretpostavljamo da je veličina deo sluga (poslednji deo sluga)
          const slugParts = slug.split('-');  // Razdvajanje sluga po '-'
          const size = slugParts[slugParts.length - 1];  // Poslednji deo je veličina (npr. 50)

          setFormData({
            page_section: "contact_page",
            customer_name: "",
            phone: "",
            email: "",
            mail_to: "",
            subject: `Upit za proizvod ${res?.payload?.data?.item?.basic_data?.name} (${res?.payload?.data?.item?.basic_data?.sku}) - Veličina: ${size}`,
            company_sector: "",
            message: `Poštovani, \n\nMolim Vas da na datu e-mail adresu pošaljete ponudu za proizvod ${res?.payload?.data?.item?.basic_data?.name} (${res?.payload?.data?.item?.basic_data?.sku}), veličina: ${size}.\n\nHvala.`,
            accept_rules: false,
            gcaptcha: token,
          });
        });
      };
      getProduct(slug);
    } else return;
  }, [slug]);

  // Automatski postavite URL proizvoda kad se komponenta učita
  useEffect(() => {
    const currentUrl = window.location.href;  // Dobijanje trenutnog URL-a stranice
    setFormData((prevData) => ({
      ...prevData,
    }));
  }, []);
  const handleChange = ({ target }) => {
    let err = [];
    err = errors.filter((error) => error !== target.name);
    setErrors(err);

    if (target.name === "accept_rules") {
      setFormData((prev) => ({
        ...prev,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [target.name]: target.value,
      }));
    }
  };
  //
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const errors = [];
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors.push(field);
      }
      setErrors(errors);
    });
    if (errors?.length > 0) {
      setLoading(false);
    } else {
      await POST(`/contact/contact_page`, {
        ...formData,
        gcaptcha: token,
      }).then((res) => {
        if (res?.code === 200) {
          pushToDataLayer("contact", { email: formData.email });
          toast.success("Uspešno ste poslali poruku!", {
            position: "top-center",
            autoClose: 2000,
          });
          setLoading(false);
          setFormData({
            page_section: "contact_page",
            customer_name: "",
            phone: "",
            email: "",
            mail_to: "",
            subject: "",
            company_sector: "",
            message: "",
            product_url: "",  // Resetujte URL
            accept_rules: false,
            gcaptcha: token,
          });
        } else {
          toast.error("Došlo je do greške! Pokušajte ponovo.", {
            position: "top-center",
            autoClose: 2000,
          });
          setLoading(false);
          setFormData({
            page_section: "contact_page",
            customer_name: "",
            phone: "",
            email: "",
            mail_to: "",
            subject: "",
            company_sector: "",
            message: "",
            accept_rules: false,
            gcaptcha: token,
          });
        }
      });
    }
  };

  return (
    <Provider reCaptchaKey={process.env.CAPTCHAKEY}>
      <ReCaptcha onVerify={verifyCaptcha} refreshReCaptcha={refreshReCaptcha} />
      <Layout>
        <div className={`ml-auto flex justify-start md:justify-end mt-5`}>
          <Breadcrumbs name={`Kontakt`} parents={[]} />
        </div>
        <h1 className={`text-[1.823rem] font-bold my-5`}>Kontakt</h1>
        <div className={`mt-5 md:mt-10 grid grid-cols-3 gap-x-10 gap-y-10`}>
          <div className={`col-span-3 lg:col-span-1`}>
            <p className={`text-[0.95rem] mt-5`}>
              Ukoliko imate pitanja, sugestije ili želite da se učlanite u našu
              organizaciju, slobodno nam se obratite. Odgovorićemo Vam u
              najkraćem roku.
            </p>
            <div className={`flex flex-col gap-2 mt-5`}>
              <div className={`flex items-center gap-2`}>
                {icons.pin}
                <span className={`text-[0.95rem]`}>
                  <span className={`font-bold`}>Adresa:</span> Bogutovo
                  Šantićeva b.b 31230 Arilje
                </span>
              </div>
              <div className={`flex items-center gap-2`}>
                {icons.phone}
                <span className={`text-[0.95rem]`}>
                  <span className={`font-bold`}>Kontakt telefon:</span>{" "}
                  <a
                    className={`hover:underline`}
                    href={`tel:+381 31 3891 111`}
                  >
                    +381 31 3891 111
                  </a>{" "}
                  <a
                    className={`hover:underline`}
                    href={`tel:+381 31 3896 757`}
                  >
                    +381 31 3896 757
                  </a>
                </span>
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className={`w-full col-span-3 lg:col-span-2 mx-auto`}
          >
            <div className={` border p-2 lg:p-5 grid gap-5 grid-cols-2`}>
              <div className={`flex flex-col gap-2 col-span-2 lg:col-span-1`}>
                <label htmlFor={`customer_name`}>Ime i prezime</label>
                <input
                  required={true}
                  type={`text`}
                  value={formData.customer_name}
                  name={`customer_name`}
                  id={`customer_name`}
                  onChange={handleChange}
                  className={`${errors.includes("customer_name")
                    ? "border-red-500"
                    : " border-slate-300"
                    } border  focus:border-boa-red focus:ring-0 focus:outline-0 p-2`}
                />
              </div>
              <div className={`flex flex-col gap-2 col-span-2 lg:col-span-1`}>
                <label htmlFor={`phone`}>Telefon</label>
                <input
                  required={true}
                  type={`text`}
                  value={formData.phone}
                  name={`phone`}
                  id={`phone`}
                  onChange={handleChange}
                  className={`${errors.includes("phone")
                    ? "border-red-500"
                    : " border-slate-300"
                    }  focus:border-boa-red focus:ring-0 focus:outline-0 p-2`}
                />
              </div>
              <div className={`flex flex-col gap-2 col-span-2 lg:col-span-1`}>
                <label htmlFor={`email`}>Email</label>
                <input
                  required={true}
                  type={`email`}
                  name={`email`}
                  value={formData.email}
                  id={`email`}
                  onChange={handleChange}
                  className={`${errors.includes("email")
                    ? "border-red-500"
                    : " border-slate-300"
                    }  focus:border-boa-red focus:ring-0 focus:outline-0 p-2`}
                />
              </div>
              <div className={`flex flex-col gap-2 col-span-2 lg:col-span-1`}>
                <label htmlFor={`subject`}>Naslov poruke</label>
                <input
                  required={true}
                  type={`text`}
                  value={formData.subject}
                  name={`subject`}
                  id={`subject`}
                  onChange={handleChange}
                  className={`${errors.includes("subject")
                    ? "border-red-500"
                    : " border-slate-300"
                    }  focus:border-boa-red focus:ring-0 focus:outline-0 p-2`}
                />
              </div>
              <div className={`flex flex-col gap-2 col-span-2`}>
                <label htmlFor={`message`}>Poruka</label>
                <textarea
                  name={`message`}
                  id={`message`}
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`${errors.includes("message")
                    ? "border-red-500"
                    : " border-slate-300"
                    }  focus:border-boa-red focus:ring-0 focus:outline-0 p-2`}
                />
              </div>
              <div
                className={`flex flex-col lg:flex-row items-start max-lg:gap-5 lg:items-center justify-between  col-span-2`}
              >
                <div className={`gap-2 flex items-center`}>
                  <input
                    required={true}
                    type={`checkbox`}
                    name={`accept_rules`}
                    id={`accept_rules`}
                    value={formData.accept_rules}
                    onChange={handleChange}
                    className={`${errors.includes("accept_rules")
                      ? "border-red-500"
                      : " border-slate-300"
                      }  focus:border-boa-red focus:ring-0 focus:outline-0 p-2 text-boa-red`}
                  />
                  <label htmlFor={`accept_rules`}>
                    <span className={`text-[0.85rem]`}>
                      Slažem se sa{" "}
                      <Link
                        href={`/strana/politika-privatnosti`}
                        className={`underline text-boa-red`}
                      >
                        politikom privatnosti
                      </Link>
                    </span>
                  </label>
                </div>
                <div className={`max-lg:w-full`}>
                  <button
                    type={`button`}
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                    className={`${loading ? `bg-boa-red` : `bg-black`
                      } lg:hover:bg-boa-red transition-all duration-500 text-white px-5 py-2  w-full`}
                  >
                    {loading ? (
                      <span className={`animate-pulse`}>{icons.load}</span>
                    ) : (
                      `Pošalji`
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Layout>
    </Provider>
  );
};
