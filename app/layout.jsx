import "./globals.css";
import "swiper/css";
import { Josefin_Sans } from "next/font/google";
import { CartContextProvider, QueryProvider, UserProvider } from "@/_providers";
import { Header } from "@/_components/shared/header/header";
import { Footer, Newsletter } from "@/_components/shared/footer";
import { SearchMobile } from "@/_components/shared/search-mobile";
import { CookieAlert } from "@/_components/shared/cookie-policy";
import Script from "next/script";
import { defaultMetadata } from "@/_lib/metadata";

const josefin_sans = Josefin_Sans({ display: "swap", subsets: ["latin"] });

export const metadata = {
  ...defaultMetadata,
};

export default function RootLayout({ children }) {
  return (
    <html lang="sr">
      <head>
        <Script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','${process.env.GTM_ID}');`,
          }}
        />
        <meta
          name="google-site-verification"
          content="wlUgmmHOO5r-nJw6OVzstADmxngiWKFr4JB5rJl9y9s"
        />
        <meta
          name="facebook-domain-verification"
          content="amwfp4ir3lthxvnq6c18aa4ap6xews"
        />

        <link
          rel={`stylesheet`}
          href={`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css`}
        />

        <Script
          src={`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/js/regular.js`}
        ></Script>
      </head>
      <body className={josefin_sans.className}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.GTM_ID}`}
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          ></iframe>
        </noscript>
        <QueryProvider>
          <CartContextProvider>
            <UserProvider>
              <Header />
              {children}
              <Newsletter />
              <Footer />
              <SearchMobile />
              <CookieAlert />
            </UserProvider>
          </CartContextProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
