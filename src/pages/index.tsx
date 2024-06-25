import Head from "next/head";
import { Container } from "@/components/styles";
import ProjectItemCard from "@/components/projects-item-card";
import { Projects } from "../utilities/data";
import styled from "styled-components";
import Image from "next/image";
import { dmSerifDisplay } from "../utilities/fonts";

const Hero = styled.section`
	display: grid;
	grid-template-columns: 1fr 1fr;
	min-height: 300px;
	place-self: center;

	height: 90vh;
	/* border: 1px solid black; */

	.hero-content {
		place-self: center center;
		h1 {
			font-size: 5rem;
			margin: 0 0 1rem 0;
		}
		p {
			margin: 0;
			font-size: 1.5rem;
		}
	}

	.hero-img-wrapper {
		position: relative;
		width: 90%;
		place-self: center end;
		border-radius: 1.5rem;
		aspect-ratio: 1/1;

		box-shadow: -10px 18px 0px #000;
		.img {
			border: 0.5rem solid black;
			place-self: center;
			border-radius: 1rem;
		}
		/* width: 200px; */
	}
`;

const ProjectSection = styled.section`
	background-color: #fafafa;
	h2 {
		font-size: 3rem;
		margin: 0 0 5rem 0;
	}

	.projects-grid {
		display: grid;
		grid-template-columns: auto auto;
		grid-template-rows: auto auto;
		gap: 2rem;
	}
`;

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
			<main>
				<Container>
					<Hero>
						<div className='hero-content'>
							<h1>Hello there!</h1>
							{/* todo: idea! make a good quote after every refresh on wish you all the best. */}
							<p>
								I'm Shawn.
								<br />
								I like making cool stuff on the web.
								<br />
								Welcome to my corner of the internet : ]
							</p>
						</div>
						<div className='hero-img-wrapper'>
							<Image
								src={"/profile.jpg"}
								fill={true}
								objectFit='cover'
								alt='Profile picture of me'
								className='img'
							/>
						</div>
					</Hero>
				</Container>
				<ProjectSection>
					<Container>
						<h2>Projects</h2>

						<div className='projects-grid'>
							{/* List of Projects */}
							{Projects.map((project) => (
								<ProjectItemCard project={project} />
							))}
						</div>
					</Container>
				</ProjectSection>
			</main>
		</>
	);
}
