import AllProjectItemCard from "@/components/all-projects-item";
import { Container } from "@/components/styles";
import { groq } from "next-sanity";
import Head from "next/head";
import styled from "styled-components";
import { sanityFetch } from "../../../sanity/lib/client";
import { GET_PROJECTS_QUERYResult, Project } from "../../../sanity/types";

const Main = styled.main`
	min-height: 100%;

	.grid {
		display: grid;
		gap: 0.5rem;
		grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
		grid-auto-rows: 1fr;
	}
`;
interface Props {
	projects: Project[];
}
function Projects({ projects }: Props) {
	return (
		<>
			<Head>
				<title>All Projects</title>
				<meta name="description" content="All my showcased projects." />
				<meta property="og:title" content="Shawn A. M. | All Projects" />
				<meta
					property="og:description"
					content="Here are all my showcased projects. More definitely coming!"
				/>
			</Head>
			<Main>
				<Container>
					<h1>All Projects</h1>
					<div className="grid">
						{projects.map((project) => (
							<AllProjectItemCard project={project} key={project.title} />
						))}
					</div>
				</Container>
			</Main>
		</>
	);
}

export default Projects;

export async function getStaticProps() {
	const GET_ALL_PROJECTS_QUERY = groq`*[_type=='project']{title, slug, description, thumbnail, markdownContent}`;
	const projects = await sanityFetch<GET_PROJECTS_QUERYResult>({
		query: GET_ALL_PROJECTS_QUERY,
	});
	return {
		props: {
			projects,
		},
		revalidate: 10,
		fallback: 'blocking',
	};
}
