import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { persistor, store } from '@/redux/store/Store';
import Cookies from 'js-cookie';
import type { AppProps } from 'next/app';
import { Noto_Sans } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import '../style/globals.css';
export const noto = Noto_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PersistGate } from 'redux-persist/integration/react';

function LandingPage({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const token = Cookies.get('token');

    const isAdminPage = router.pathname.startsWith('/admin');
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <div className={`${noto.className} bg-slate-200`}>
                    <Head>
                        <title>TShop</title>
                        <link rel="shortcut icon" href="/svg/logo.svg" type="image/x-icon" />
                    </Head>
                    {!isAdminPage && <Header token={token} />}
                    
                    <main className="xl:px-8 md:px-6">
                        <div className={`mx-auto ${isAdminPage ? '' : 'xl:max-w-[1300px] '}`}>
                            <Component {...pageProps} token={token} />
                        </div>
                    </main>

                    {!isAdminPage && <Footer />}

                    <Toaster position="top-right" />
                </div>
            </PersistGate>
        </Provider>
    );
}

export default LandingPage;
