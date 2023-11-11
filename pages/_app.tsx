import type { AppProps } from "next/app";
import { Noto_Sans } from "next/font/google";
import "../style/globals.css";
import Header from "@/components/layout/header";

export const noto = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function LandingPage({ Component, pageProps }: AppProps) {
  return (
    <main className={`${noto.className} min-h-screen h-[2000px]  bg-slate-200`}>
      <div className=" mx-auto lg:max-w-[1300px]">
        <Header />
        <Component {...pageProps} />
      </div>
    </main>
  );
}

export default LandingPage;
