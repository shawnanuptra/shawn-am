import Layout from "@/components/layout";
import { GlobalStyles } from "@/components/styles";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App(
    { Component, pageProps }: AppProps,
    session: Session
) {
    return (
        <SessionProvider session={session}>
            <Layout>
                <GlobalStyles />
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>
    );
}
