import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				<link
					rel='stylesheet'
					href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css'
				/>
				<script src='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js'></script>

				<script src='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/go.min.js'></script>

				<script>hljs.highlightAll();</script>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
