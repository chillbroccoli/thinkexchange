import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

import { GlobalStyles } from "~/styles/global";
import { queryClient } from "~/utils/queryClient";

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Thinkexchange</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            primaryColor: "indigo",
            colorScheme: "light",
            fontFamily: poppins.style.fontFamily,
            headings: { fontFamily: poppins.style.fontFamily },
          }}
        >
          <GlobalStyles />
          <Notifications position="top-right" />
          <Component {...pageProps} />
        </MantineProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
