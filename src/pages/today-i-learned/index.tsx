import BlogItemCard from "@/components/blog-item-card";
import { Container } from "@/components/styles";
import { groq } from "next-sanity";
import Head from "next/head";
import styled from "styled-components";
import { sanityFetch } from "../../../sanity/lib/client";

const Main = styled.main`
	margin-bottom: 2rem;
`;

const Blogs = styled.div`
	h1 {
		margin-bottom: 0.5rem;
	}
	p {
		margin-top: 0;
		margin-bottom: 2rem;
	}

	border-bottom: 1px solid black;
`;

const BlogItemCardWrapper = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
`;

interface Props {
	entries: any;
}

function TodayILearned({ entries }: Props) {
	return (
		<>
			<Head>
				<title>Today I Learned</title>
				<meta name="description" content="Small things I learned throughout my career" />
				<meta property="og:title" content="Shawn A. M. | Today I Learned" />
				<meta
					property="og:description"
					content="A collection of small tidbits of learning in my journey!"
				/>
			</Head>

			<Main>
				<Container style={{ paddingBottom: 0 }}>
					<Blogs>
						<h1>Today I Learned</h1>
						<p>Small tidbits I pickup on in my career (and life in general!)</p>
					</Blogs>
				</Container>
				<BlogItemCardWrapper>
					{entries.map((entry: any) => (
						<BlogItemCard isBlog={false} blog={entry} key={entry.title} />
					))}
				</BlogItemCardWrapper>
			</Main>
		</>
	);
}

export default TodayILearned;

export async function getStaticProps() {
	const GET_ENTRIES = groq`*[_type=='entries'] | order(publishedAt desc)`;
	const entries = await sanityFetch({
		query: GET_ENTRIES,
	});

	return {
		props: {
			entries,
		},
		revalidate: 30,
	};
}
