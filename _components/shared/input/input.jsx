"use client";

export const Input = ({
  className,
  errClassName,
  formData = [],
  setFormData = () => {},
  name = "",
  title = "",
  type = "text",
  errors,
  setErrors,
  isCheckout = false,
}) => {
  //pravimo input komponentu da bismo izbegli ponavljanje koda, na promenu vrednost se upisuje u formData u shipping i billing delu, da bi bili isti

  return (
    <div
      className={`inputFocus relative w-full flex-1 placeholder:!text-black`}
    >
      {isCheckout ? (
        <>
          {type === "text" ? (
            <>
              <input
                type={`text`}
                value={formData?.[name]}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [name]: e.target.value,
                    [name + `shipping`]: e.target.value,
                    [name + `billing`]: e.target.value,
                  });
                  //ako polje nije prazno, brisemo ga iz niza gresaka
                  if (e?.target?.value?.length > 0) {
                    setErrors(
                      errors?.filter((error) => error !== `${name}shipping`),
                    );
                  }
                }}
                className={`w-full border bg-[#ebebe9] border-slate-200 py-3 text-[0.965rem] font-normal  placeholder:text-[0.965rem] placeholder: focus:border-slate-200 focus:border-b-black focus:outline-none focus:ring-0 max-sm:!text-[16px] ${className} ${errClassName} transition-all duration-500`}
              />
              <label
                className={`z-0 text-[#919191] ${className} absolute left-2 top-3.5 font-normal  transition-all duration-500 ${
                  formData?.[name + `shipping`]?.length > 0 &&
                  "!top-[2px] !text-[0.7rem] !text-black"
                }`}
              >
                {title}
              </label>
            </>
          ) : (
            <>
              <textarea
                rows={5}
                value={formData?.[name]}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [name]: e.target.value,
                    [name + `shipping`]: e.target.value,
                    [name + `billing`]: e.target.value,
                  });
                }}
                className={`w-full border bg-[#ebebe9] border-slate-200 py-3 text-[0.965rem] font-normal  placeholder:text-[0.965rem] placeholder: focus:border-slate-200 focus:border-b-black focus:outline-none focus:ring-0 max-sm:!text-[16px] ${className} ${errClassName} transition-all duration-500`}
              />
              <label
                className={`z-0 text-[#919191] ${className} absolute left-2 top-3.5 font-normal  transition-all duration-500 ${
                  formData?.[name + `shipping`]?.length > 0 &&
                  "!top-[2px] !text-[0.7rem] !text-black"
                }`}
              >
                {title}
              </label>
            </>
          )}
        </>
      ) : (
        <>
          {type === "text" ? (
            <>
              <input
                type={`text`}
                value={formData?.[name]}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [name]: e.target.value,
                  });
                  //ako polje nije prazno, brisemo ga iz niza gresaka
                  if (e?.target?.value?.length > 0) {
                    setErrors(errors?.filter((error) => error !== name));
                  }
                }}
                className={`w-full border bg-[#ebebe9] border-slate-200 py-3 text-[0.965rem] font-normal  placeholder:text-[0.965rem] placeholder: focus:border-slate-200 focus:border-b-black focus:outline-none focus:ring-0 max-sm:text-[16px] ${className} ${errClassName} transition-all duration-500`}
              />
              <label
                className={`z-0 text-[#919191] ${className} absolute left-2 top-3.5 font-normal  transition-all duration-500 ${
                  formData?.[name]?.length > 0 &&
                  "!top-[2px] !text-[0.7rem] !text-black"
                }`}
              >
                {title}
              </label>
            </>
          ) : (
            <>
              <textarea
                rows={5}
                value={formData?.[name]}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [name]: e.target.value,
                  });
                  if (!isCheckout) {
                    setErrors(errors?.filter((error) => error !== name));
                  }
                }}
                className={`w-full border bg-[#ebebe9] border-slate-200 py-3 text-[0.965rem] font-normal  placeholder:text-[0.965rem] placeholder: focus:border-slate-200 focus:border-b-black focus:outline-none focus:ring-0 max-sm:text-[16px] ${className} ${errClassName} transition-all duration-500`}
              />
              <label
                className={`z-0 text-[#919191] ${className} absolute left-2 top-3.5 font-normal  transition-all duration-500 ${
                  formData?.[name]?.length > 0 &&
                  "!top-[2px] !text-[0.7rem] !text-black"
                }`}
              >
                {title}
              </label>
            </>
          )}
        </>
      )}
    </div>
  );
};
