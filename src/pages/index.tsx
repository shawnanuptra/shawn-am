import Head from "next/head";
import { Container } from "@/components/styles";
import ProjectItemCard from "@/components/projects-item-card";
import { Projects } from "../utilities/data";
import styled from "styled-components";
import Image from "next/image";
import { device } from "@/utilities/deviceSize";

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
			margin: 0 0 1rem 0;
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

	@media ${device.sm} {
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

	@media ${device.sm} {
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
			gap: 1rem;
		}
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
								Welcome to my corner of the internet :]
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
						<h2 id='projects'>Projects</h2>

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
