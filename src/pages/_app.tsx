import Layout from "@/components/layout";
import { GlobalStyles } from "@/components/styles";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <GlobalStyles />
            <Component {...pageProps} />
        </Layout>
    );
}
