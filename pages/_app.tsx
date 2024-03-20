import type { AppProps } from "next/app";
import { Noto_Sans } from "next/font/google";
import "../style/globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Provider } from "react-redux";
import { store } from "@/redux/store/Store";
export const noto = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
import Head from "next/head";

function LandingPage({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className={`${noto.className} bg-slate-200`}>
        <Head>
          <title>TShop</title>
          <link rel="shortcut icon" href="/svg/logo.svg" type="image/x-icon" />
        </Head>
        <Header />
        <main>
          <div className=" mx-auto lg:max-w-[1300px]">
            <Component {...pageProps} />
          </div>
        </main>
        <Footer/>
      </div>
    </Provider>
  );
}

export default LandingPage;
