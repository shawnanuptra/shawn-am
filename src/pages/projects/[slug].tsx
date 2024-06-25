import { Project, Projects } from "@/utilities/data";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import React from "react";

interface IProjectPage {
	project: Project;
}
const ProjectPage = ({ project }: IProjectPage) => {
	return (
		<>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta charSet='utf-8' />
				<title>{project.title}</title>
				<meta name='Description' content={project.description}></meta>
			</Head>
			<section>
				<div>{project.title}</div>
			</section>
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

// export async function getStaticProps(): GetStaticProps {
export const getStaticProps: GetStaticProps = async (context) => {
	const { slug } = context.params as IParams;
	// const res = await fetch(`https://.../projects/${params.id}`);
	const project = Projects.find((element) => element.slug === slug);

	return { props: { project } };
};
