import { Project, Projects } from "@/utilities/data";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { promises as fs } from "fs";
import { Container } from "@/components/styles";
import styled from "styled-components";
import Image, { ImageProps } from "next/image";
import { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

interface Props {
	mdxSource: MDXRemoteSerializeResult;
}

const Title = styled.h1`
	font-size: 3rem;
	/* padding-bottom: 1rem;
	border-bottom: 1px solid grey; */
`;
const H2 = styled.h2`
	font-size: 2rem;
	margin: 2.5rem 0 2rem;
	padding-top: 2.5rem;
	border-top: 1px solid grey;
`;
const H3 = styled.h3`
	font-size: 1.5rem;
	display: inline-block;
	padding-bottom: 0.5rem;
	border-bottom: 1px solid grey;
`;

const Link = styled.a`
	color: black;
	text-decoration: underline;
	cursor: pointer;
	font-weight: bold;
`;

const P = styled.p`
	line-height: 1.2;
	margin: 1.25rem 0;
`;

const ImageWrapper = styled.div``;

const components = {
	h1: (props: any) => <Title>{props.children}</Title>,
	h2: (props: any) => <H2>{props.children}</H2>,
	h3: (props: any) => <H3>{props.children}</H3>,
	a: (props: any) => <Link>{props.children}</Link>,
	p: (props: any) => <P>{props.children}</P>,

	img: (props: any) => (
		<Image
			sizes='100vw'
			width={100}
			height={20}
			style={{
				width: "auto",
				height: "100%",
				maxHeight: "800px",
				textAlign: "center",
				display: "block",
				margin: "0 auto",
			}}
			{...(props as ImageProps)}
		/>
	),
};

const ProjectPage = ({ mdxSource }: Props) => {
	useEffect(() => {
		document.querySelectorAll("pre code").forEach((block) => {
			hljs.highlightElement(block as HTMLElement);
		});
	}, []);

	return (
		<>
			<Container>
				<MDXRemote {...mdxSource} components={components} />
			</Container>
		</>
	);
};

export default ProjectPage;

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
	// Call an external API endpoint to get posts
	// const res = await fetch("https://.../posts");
	// const posts = await res.json();

	// Get the paths we want to pre-render based on posts
	const paths = Projects.map((project) => ({
		params: {
			slug: project.slug,
		},
	}));

	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: false };
};

interface IParams extends ParsedUrlQuery {
	slug: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
	const { slug } = context.params as IParams;

	// MDX text - can be from a local file, database, CMS, fetch, anywhere...
	const res = await fs.readFile(`src/markdown/${slug}.md`, "utf-8");
	// const mdxText = await res.text();
	const mdxSource = await serialize(res);
	return { props: { mdxSource } };
};
