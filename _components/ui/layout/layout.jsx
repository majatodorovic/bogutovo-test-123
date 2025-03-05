export const Layout = ({
  children,
  className,
  isAnchored = false,
  ...props
}) => {
  return (
    <div
      {...props}
      className={`container mx-auto ${
        isAnchored
          ? "2xl:pl-[2rem] 3xl:pl-[3rem] max-2xl:px-2 !ml-auto"
          : "2xl:px-[2rem] 3xl:px-[3rem] max-2xl:px-2 "
      } ${className}`}
    >
      {children}
    </div>
  );
};
