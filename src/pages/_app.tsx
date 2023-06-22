import "../styles/styles.css";
import "react-quill/dist/quill.snow.css";

import NiceModal from "@ebay/nice-modal-react";
import { QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Rubik } from "next/font/google";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import { queryClient } from "~/utils/queryClient";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "400", "500", "700", "900"],
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <title>Thinkexchange</title>
      </Head>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <NiceModal.Provider>
            <div className={rubik.className}>
              <Component {...pageProps} />
              <Toaster />
            </div>
          </NiceModal.Provider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
