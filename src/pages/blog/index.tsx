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
	blogs: any;
}
function Blog({ blogs }: Props) {
	return (
		<>
			<Head>
				<title>Blogs</title>
				<meta name="description" content="A list of all my blog entries" />
				<meta property="og:title" content="Shawn A. M. | Blogs" />
				<meta
					property="og:description"
					content="Here are all my blog entries. More definitely coming!"
				/>
			</Head>

			<Main>
				<Container style={{ paddingBottom: 0 }}>
					<Blogs>
						<h1>Blogs</h1>
						<p>
							Personal experiences, learnings, and thoughts. Come build a parasocial relationship
							with me!
						</p>
					</Blogs>
				</Container>
				<BlogItemCardWrapper>
					{blogs.map((blog: any) => (
						<BlogItemCard blog={blog} key={blog.title} />
					))}
				</BlogItemCardWrapper>
			</Main>
		</>
	);
}

export default Blog;

export async function getStaticProps() {
	const GET_BLOGS = groq`*[_type=='blog']`;
	const blogs = await sanityFetch({
		query: GET_BLOGS,
	});

	return {
		props: {
			blogs,
		},
		revalidate: 30,
	};
}
