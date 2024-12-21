import ProjectItemCard from "@/components/projects-item-card";
import { Container } from "@/components/styles";
import { device } from "@/utilities/deviceSize";
import { groq } from "next-sanity";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { sanityFetch } from "../../sanity/lib/client";
import { GET_PROJECTS_QUERYResult, Project } from "../../sanity/types";

const Hero = styled.section`
	display: grid;
	grid-template-columns: 1fr 1fr;
	min-height: 300px;
	place-self: center;

	height: 90vh;
	/* border: 1px solid #202020; */
	.hero-content {
		place-self: center center;
		h1 {
			font-size: 5rem;
			margin: 0 0 2rem 0;
			line-height: 1;
		}
		p {
			margin: 0;
			font-size: 1.5rem;
			color: #202020d5;
		}
	}

	.hero-img-wrapper {
		position: relative;
		width: 90%;
		place-self: center end;
		border-radius: 1.5rem;
		aspect-ratio: 1/1;

		box-shadow: -10px 18px 0px #202020;
		.img {
			border: 0.5rem solid #202020;
			place-self: center;
			border-radius: 1rem;
		}
		/* width: 200px; */
	}

	@media ${device.md} {
		display: flex;
		flex-direction: column;
		height: auto;
		padding: 2rem 0 4rem 0;
		.hero-content {
			text-align: center;
			order: 1;
			h1 {
				font-size: 2rem;
			}
			p {
				margin: 0;
				font-size: 1rem;
			}
		}

		.hero-img-wrapper {
			order: -1;
			position: relative;
			width: 70%;
			place-self: center end;
			border-radius: 1.3rem;
			aspect-ratio: 1/1;
			margin-bottom: 2rem;

			box-shadow: -5px 9px 0px #202020;
			.img {
				border: 0.5rem solid #202020;
				place-self: center;
				border-radius: 1rem;
			}
			/* width: 200px; */
		}
	}

	@media ${device.sm} {
		.hero-img-wrapper {
			box-shadow: -8px 5px 0 #202020;
			.img {
				border-width: 0.4rem;
			}
		}
	}
`;

const ProjectSection = styled.section`
	// add separator line
	&::before {
		content: "";
		display: block;
		width: 15rem;
		height: 0.25rem;
		border-radius: 99px;
		background-color: #202020;
		margin: 0 auto;
	}

	p {
		color: #202020d5;
	}
	h2 {
		font-size: 3rem;
		margin: 0 0 5rem 0;
	}
	#projects {
		scroll-margin-top: 5rem;
	}
	.projects-grid {
		display: grid;
		grid-template-columns: auto auto;
		grid-template-rows: auto auto;
		gap: 2rem;
	}

	.more-projects {
		display: block;
		width: fit-content;
		background-color: #202020;
		color: #fafafa;
		border: 1px solid #202020;
		padding: 1.25rem 2rem;
		font-size: 1.25rem;
		border-radius: 0.5rem;
		margin: 4rem auto 0;

		transition: all 0.1s ease-in;

		&:focus-visible,
		&:hover {
			background-color: #fafafa;
			cursor: pointer;
			color: #202020;
			transform: translateX(3px) translateY(-3px);
			box-shadow: -8px 8px 0px #202020;
			outline: 2px solid #202020;
			outline-offset: 0;
		}
	}

	@media ${device.md} {
		&::before {
			content: "";
			display: block;
			width: 3rem;
			height: 0.25rem;
			border-radius: 99px;
			background-color: #202020;
			margin: 0 auto 2rem;
		}

		text-align: center;

		h2 {
			font-size: 2rem;
			margin-bottom: 3rem;
		}

		.projects-grid {
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
		}

		.more-projects {
			font-size: 1rem;
		}
	}
`;

interface Props {
	projects: Project[];
}
export default function Home({ projects }: Props) {
	return (
		<>
			<Head>
				<title>Shawn A. Martin</title>
				<meta name="description" content="Shawn A. Martin - Junior Web Developer" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" as="icon" />
			</Head>
			<main>
				<section>
					<Container>
						<Hero>
							<div className="hero-content">
								<h1>Hello there!</h1>
								{/* todo: idea! make a good quote after every refresh on wish you all the best. */}
								<p>
									I&apos;m Shawn.
									<br />
									I like making cool stuff on the web.
									<br />
									Welcome to my corner of the internet :]
								</p>
							</div>
							<div className="hero-img-wrapper">
								<Image
									sizes={`(max-width: ${device.sm}) 90vw, 40vw`}
									priority={true}
									src={"/profile.JPG"}
									fill={true}
									style={{ objectFit: "cover" }}
									alt="Profile picture of me"
									className="img"
								/>
							</div>
						</Hero>
					</Container>
				</section>
				<ProjectSection>
					<Container>
						<h2 id="projects">Latest Projects</h2>

						<div className="projects-grid">
							{/* List of Projects */}
							{projects.map((project) => (
								<ProjectItemCard project={project} key={project.title} />
							))}
						</div>
						<Link href="/projects" className="more-projects">
							See more projects &#8594;
						</Link>
					</Container>
				</ProjectSection>
			</main>
		</>
	);
}

export async function getStaticProps() {
	const GET_PROJECTS_QUERY = groq`*[_type=='project']{title, slug, description, thumbnail, markdownContent}|order(_updatedAt desc)[0...4]`;
	const projects = await sanityFetch<GET_PROJECTS_QUERYResult>({
		query: GET_PROJECTS_QUERY,
	});

	return {
		props: {
			projects,
		},
		revalidate: 10,
	};
}
