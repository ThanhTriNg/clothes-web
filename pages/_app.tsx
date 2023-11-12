import type { AppProps } from "next/app";
import { Noto_Sans } from "next/font/google";
import "../style/globals.css";
import Header from "@/components/layout/Header";
import { Provider } from "react-redux";
import { store } from "@/redux/store/Store";
export const noto = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function LandingPage({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <main className={`${noto.className} min-h-screen  bg-slate-200`}>
        <div className=" mx-auto lg:max-w-[1300px]">
          <Header />
          <Component {...pageProps} />
        </div>
      </main>
    </Provider>
  );
}

export default LandingPage;
