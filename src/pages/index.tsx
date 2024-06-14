import Head from "next/head";
import { Roboto } from "next/font/google";

// const roboto = Roboto({ weight: ["400", "700", "900"], subsets: ["latin"] });

export default function Home() {
	return (
		<>
			<Head>
				<title>Shawn A. M. | Bringing web to life</title>
				<meta
					name='description'
					content='Shawn A. Martin - aspiring web developer'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>testing</main>
		</>
	);
}
