"use client";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { post } from "@/_api/api";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

import hide from "@/assets/Icons/hide-password.png";
import show from "@/assets/Icons/show-password.png";

import Registration from "../Registration/Registration";
import { userContext } from "@/_providers";
import { Layout } from "@/_components/ui/layout";
import { icons } from "@/_lib/icons";
import { useQueryClient } from "@tanstack/react-query";

const UserPage = () => {
  const queryClient = useQueryClient();
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(userContext);
  const [isReg, setIsReg] = useState(false);
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const toggleLoginPasswordVisibility = () => {
    setShowLoginPassword((prevShowLoginPassword) => !prevShowLoginPassword);
  };
  const [type, setType] = useState("password");

  const [formData, setFormData] = useState({
    email: "",
    email1: "",
    password: "",
  });

  const required = ["email", "password"];

  const [errors, setErrors] = useState([]);

  const formChangeHandler = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const formSubmitHandler = () => {
    setLoading(true);
    const err = [];
    if (err.length > 0) {
      setErrors(err);
      setLoading(false);
    } else {
      const ret = {
        email: formData.email,
        password: formData.password,
      };
      post("/customers/sign-in/login", ret)
        .then(async (response) => {
          if (response?.code === 200) {
            Cookies.set("customer_token", response.payload.customer_token, {
              expires: 365,
            });
            setIsLoggedIn(true);
            localStorage.setItem("loggedIn", true);
            await queryClient.invalidateQueries({
              queryKey: ["cartBadge"],
            });
            await queryClient.invalidateQueries({
              queryKey: ["wishlistBadge"],
            });
            router.push("/customer-profil");
          } else {
            setLoading(false);
            setErrors("Greška pri logovanju.");
            toast.error(
              "Greška pri logovanju. Proverite da li ste uneli ispravne podatke.",
              {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              },
            );
          }

          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };

  const changePasswordHandler = () => {
    const err = [];
    if (err.length > 0) {
      setErrors(err);
    } else {
      const ret = {
        email: formData.email1,
      };
      post("/customers/sign-in/forgot-password", ret)
        .then((response) => {
          if (response?.code === 200) {
            toast.success(
              "Uspešno ste poslali zahtev. Očekujte mail sa daljim instrukcijama.",
              {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              },
            );
          } else {
            setErrors("Greška pri logovanju.");
            toast.error(
              "Greška pri logovanju. Proverite da li ste uneli ispravne podatke.",
              {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              },
            );
          }
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    const checkLoggedInStatus = () => {
      const is_logged = localStorage.getItem("loggedIn");
      if (is_logged === "true") {
        router.push("/customer-profil");
      }
    };
    checkLoggedInStatus();

    const handleStorageChange = (event) => {
      if (event.key === "loggedIn") {
        checkLoggedInStatus();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
      <Layout className={`my-5 md:my-10`}>
        <div className="mx-auto grid grid-cols-6 gap-y-3 gap-x-3 sm:mt-8 ">
          <div className="col-span-6 p-1  sm:col-span-3 px-8 bg-[#f7f7f7]  max-md:py-[2rem] py-[9rem] md:ml-[2rem] max-md:mx-[1rem] max-md:mt-[1rem] mb-[2rem]">
            <div className="h-[100%] flex flex-col items-center">
              <div className="loginHolder">
                <h3 className="font-semibold text-xl underline">
                  IMATE NALOG?
                </h3>
                <p className="mb-[2rem] mt-[0.4rem]  text-[#4b4b4b]">
                  Molimo Vas unesite Vaše podatke.
                </p>
                <form className="flex flex-col" onSubmit={formSubmitHandler}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={formChangeHandler}
                    placeholder="E-mail:"
                    className="lg:w-[24rem] bg-white   border border-[#e0e0e0] focus:outline-0 focus:ring-0 focus:border-[#e0e0e0] py-[0.6rem]"
                  />

                  <div className="flex relative">
                    <input
                      name="password"
                      type={showLoginPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={formChangeHandler}
                      id="password"
                      placeholder="Lozinka*"
                      className="mt-[0.6rem] block lg:w-[24rem] bg-white  border border-[#e0e0e0] focus:outline-0 focus:ring-0 focus:border-[#e0e0e0] py-[0.6rem] lg:mr-[0.6em] w-full"
                    />
                    <button
                      type={"button"}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleLoginPasswordVisibility();
                      }}
                      className="max-lg:absolute max-lg:-right-[2rem] lg:right-[2rem] top-[1rem]"
                    >
                      {showLoginPassword ? (
                        <Image
                          src={hide}
                          alt="hide password"
                          width={22}
                          height={22}
                        />
                      ) : (
                        <Image
                          src={show}
                          alt="show password"
                          width={22}
                          height={22}
                        />
                      )}
                    </button>
                  </div>
                </form>
                <div className="flex justify-between mt-[2rem] align-center">
                  <button
                    onClick={handleOpenModal}
                    className="underline lg:ml-[0.6rem] block text-sm"
                  >
                    Zaboravili ste lozinku?
                  </button>
                  {isOpen && (
                    <div
                      className={`max-md:z-[20000] fixed max-md:mx-auto max-md:overflow-y-scroll scale-100 transition-all duration-500 z-[101] top-0 left-0 w-screen h-screen flex items-center justify-center popup`}
                    >
                      <div
                        className={`
                        bg-white max-md:overflow-y-scroll border shadow  p-[40px] flex flex-col relative borderThin`}
                      >
                        <h3 className="font-semibold text-xl underline">
                          ZABORAVILI STE LOZINKU?
                        </h3>
                        <p className="mb-[2rem] mt-[0.4rem]  text-[#4b4b4b]">
                          Unesite e-mail adresu da biste poništili lozinku.
                        </p>
                        <form>
                          <input
                            name="email1"
                            type="email"
                            autoComplete="off"
                            placeholder="E-mail:"
                            value={formData.email1}
                            onChange={formChangeHandler}
                            className="lg:w-[24rem]  focus:outline-0 focus:ring-0 focus:border-[#e0e0e0] border border-[#e0e0e0] py-[0.6rem] w-full"
                          />
                        </form>
                        <button
                          onClick={changePasswordHandler}
                          className="bg-boa-dark-blue text-white py-[0.7rem] px-[1.3rem] text-sm hover:bg-opacity-70 w-fit mt-[0.6rem] ml-auto"
                        >
                          RESETUJ LOZINKU
                        </button>
                        <button
                          onClick={handleCloseModal}
                          className="absolute top-2 right-3"
                        >
                          X
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={formSubmitHandler}
                    className="bg-boa-dark-blue text-white py-[0.7rem] px-[1.3rem] text-sm hover:bg-opacity-70 lg:mr-[2rem] max-lg:ml-[2rem] max-md:whitespace-nowrap"
                  >
                    {loading ? (
                      <span className={`animate-spin`}>{icons.load}</span>
                    ) : (
                      <>PRIJAVI SE</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-6  p-1 sm:col-span-3 px-8 bg-[#f7f7f7]  max-md:py-[2rem] py-[9rem] md:mr-[2rem] max-md:mx-[1rem] max-md:mt-[0rem] mb-[2rem]">
            <Registration setIsReg={setIsReg} />
          </div>
        </div>
      </Layout>
      {isReg && (
        <div
          onClick={() => {
            setIsReg(false);
          }}
          className={`bg-black/40 fixed z-[200] top-0 left-0 w-screen h-screen`}
        />
      )}
    </>
  );
};

export default UserPage;
