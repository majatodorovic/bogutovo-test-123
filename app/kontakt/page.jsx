import { Contact as Page } from "@/_pages/contact";
import { Suspense } from "react";

const Contact = () => {
  return (
    <Suspense>
  <Page />
  </Suspense>
);
};

export default Contact;

export const metadata = {
  title: "Kontakt | Bogutovo",
};
