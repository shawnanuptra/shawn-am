import { device } from "@/utilities/deviceSize";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { groq } from "next-sanity";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import styled from "styled-components";
import { sanityFetch } from "../../../sanity/lib/client";
import { BlogContainer, components } from "../projects/[slug]";
import { useRouter } from "next/router";
import styles from "./[slug].module.css";

interface Props {
	mdxSource: MDXRemoteSerializeResult;
	blogTitle: string;
	blog: any;
}
export const TitleWrapper = styled.div`
	h1 {
		font-size: 3rem;
		line-height: 1.3;
		margin-bottom: 0;
		@media ${device.sm} {
			font-size: 2.5rem;
		}
	}
	time,
	.series {
		font-size: 1rem;
		margin: 0;
	}

	.series {
		font-style: italic;
	}

	@media ${device.sm} {
		font-size: 0.8rem;
		margin: 0;
	}
`;
const BlogPostPage = ({ mdxSource, blogTitle, blog }: Props) => {
	const router = useRouter();
	if (router.isFallback) {
		return <p>Loading..</p>;
	}
	return (
		<>
			<Head>
				<title>{blogTitle}</title>
				<meta property="og:title" content={"Shawn A. M. | " + blogTitle} />
			</Head>
			<BlogContainer className={styles.container}>
				<TitleWrapper>
					<h1>{blogTitle}</h1>
					<time dateTime={blog.publishedAt}>{new Date(blog.publishedAt).toDateString()}</time>
					{
						// show series if there it's in a series
						blog.series && (
							<p className="series">
								{blog.series}: Entry {blog.entry}
							</p>
						)
					}
				</TitleWrapper>

				<MDXRemote {...mdxSource} components={components} />
			</BlogContainer>

			{/* Highlight.js so don't go through build system */}
		</>
	);
};

export default BlogPostPage;

// getStaticPaths for paths of projects
export const getStaticPaths: GetStaticPaths = async () => {
	const GET_BLOGS_SLUG_QUERY = groq`*[_type=='blog']{slug}`;
	const slugs = await sanityFetch<any>({
		query: GET_BLOGS_SLUG_QUERY,
	});
	const paths = slugs.map(({ slug }: any) => ({
		params: {
			slug: slug?.current,
		},
	}));
	return { paths, fallback: true };
};

interface IParams extends ParsedUrlQuery {
	slug: string;
}

// getStaticProps to get project information from server
export const getStaticProps: GetStaticProps = async (context) => {
	const { slug } = context.params as IParams;
	const GET_BLOG_DATA_QUERY = groq`*[_type=='blog' && slug.current==$slug][0]{title, markdownContent, publishedAt, series, entry}`;
	const blog = await sanityFetch<any>({
		query: GET_BLOG_DATA_QUERY,
		params: {
			slug: slug,
		},
	});

	const mdxSource = await serialize(blog?.markdownContent as string);
	const blogTitle = blog?.title;
	return { props: { mdxSource, blogTitle, blog }, revalidate: 30 };
};
