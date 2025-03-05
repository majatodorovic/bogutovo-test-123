"use client";

export const Button = ({
  children,
  className,
  variant = "primary",
  ...props
}) => {
  switch (variant) {
    case "primary":
      return (
        <button
          {...props}
          className={`bg-boa-red px-[3.2rem] text-center rounded-xl py-[1.1rem] text-[1rem] font-semibold text-white hover:bg-boa-dark transition-all duration-500 ${className}`}
        >
          {children}
        </button>
      );
    case "secondary":
      return (
        <button
          {...props}
          className={`bg-[#474747] px-[3.2rem] text-center py-[1rem] text-[1rem] font-semibold text-white hover:bg-boa-red transition-all duration-500 ${className}`}
        >
          {children}
        </button>
      );
  }
};
