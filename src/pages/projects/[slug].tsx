import { device } from "@/utilities/deviceSize";
import hljs from "highlight.js";
import js from "highlight.js/lib/languages/javascript";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { groq } from "next-sanity";
import Head from "next/head";
import Image, { ImageProps } from "next/image";
import { ParsedUrlQuery } from "querystring";
import { useEffect } from "react";
import styled from "styled-components";
import { sanityFetch } from "../../../sanity/lib/client";
import { GET_PROJECTS_SLUG_QUERYResult, GET_PROJECT_DATA_QUERYResult } from "../../../sanity/types";
import styles from "./[slug].module.css";

interface Props {
	mdxSource: MDXRemoteSerializeResult;
	projectTitle: string;
}

export const BlogContainer = styled.main`
	max-width: 1000px;
	margin: 5rem auto;
	border: 2px solid #202020;
	padding: 2.5rem;
	border-radius: 1.25rem;

	background-color: #fafafa;

	@media ${device.sm} {
		border: 0;
		margin: 0 auto;
		padding: 1rem;
		max-width: 100vw;
	}
`;

export const Title = styled.h1`
	font-size: 3rem;
	line-height: 1.3;
	/* padding-bottom: 1rem;
	border-bottom: 1px solid grey; */
	@media ${device.sm} {
		font-size: 2.5rem;
	}
`;
export const H2 = styled.h2`
	font-size: 2rem;
	margin: 2.5rem 0 2rem;
	padding-top: 2.5rem;
	border-top: 1px solid grey;
`;
export const H3 = styled.h3`
	font-size: 1.5rem;
	margin-top: 3rem;
`;

export const StyledA = styled.a`
	color: #202020;
	text-decoration: underline;
	cursor: pointer;
	font-weight: bold;
	white-space: wrap;
`;

export const P = styled.p`
	margin: 1.25rem 0;
	color: #202020d5;
	line-height: 1.5;
	@media ${device.sm} {
		font-size: 1rem;
		margin: 1rem auto;
	}
`;

export const components = {
	h1: (props: any) => <Title>{props.children}</Title>,
	h2: (props: any) => <H2>{props.children}</H2>,
	h3: (props: any) => <H3>{props.children}</H3>,
	a: (props: any) => <StyledA href={props.href}>{props.children}</StyledA>,
	p: (props: any) => <P>{props.children}</P>,
	code: (props: any) => (
		// <code style={{ whiteSpace: "pre-wrap !important" }}>
		<code className={styles.codestyle}>{props.children}</code>
	),
	img: (props: any) => (
		<Image
			sizes="100vw"
			width={100}
			height={20}
			style={{
				width: "auto",
				height: "auto",
				maxHeight: "800px",
				minWidth: "200px",
				maxWidth: "100%",
				textAlign: "center",
				display: "block",
				margin: "0 auto",
			}}
			{...(props as ImageProps)}
			alt={""}
		/>
	),
};

const ProjectPage = ({ mdxSource, projectTitle }: Props) => {
	useEffect(() => {
		// const hljs = require("highlight.js");
		hljs.configure({});
		hljs.registerLanguage("javascript", js);
		hljs.unregisterLanguage("haskell");
		document.querySelectorAll("pre code").forEach((block) => {
			hljs.highlightElement(block as HTMLElement);
		});
	});

	return (
		<>
			<Head>
				<title>{projectTitle}</title>
				<meta property="og:title" content={"Shawn A. M. | " + projectTitle} />
			</Head>
			<BlogContainer className={styles.container}>
				<MDXRemote {...mdxSource} components={components} />
			</BlogContainer>

			{/* Highlight.js so don't go through build system */}
		</>
	);
};

export default ProjectPage;

// getStaticPaths for paths of projects
export const getStaticPaths: GetStaticPaths = async () => {
	const GET_PROJECTS_SLUG_QUERY = groq`*[_type=='project']{slug}`;
	const slugs = await sanityFetch<GET_PROJECTS_SLUG_QUERYResult>({
		query: GET_PROJECTS_SLUG_QUERY,
	});
	const paths = slugs.map(({ slug }) => ({
		params: {
			slug: slug?.current,
		},
	}));
	return { paths, fallback: false };
};

interface IParams extends ParsedUrlQuery {
	slug: string;
}

// getStaticProps to get project information from server
export const getStaticProps: GetStaticProps = async (context) => {
	const { slug } = context.params as IParams;
	const GET_PROJECT_DATA_QUERY = groq`*[_type=='project' && slug.current==$slug][0]{title, markdownContent}`;
	const project = await sanityFetch<GET_PROJECT_DATA_QUERYResult>({
		query: GET_PROJECT_DATA_QUERY,
		params: {
			slug: slug,
		},
	});

	const mdxSource = await serialize(project?.markdownContent as string);
	const projectTitle = project?.title;
	return { props: { mdxSource, projectTitle }, revalidate: 5 };
};
