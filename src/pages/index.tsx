import Head from "next/head";
import { Container } from "@/components/styles";
import ProjectItemCard from "@/components/projects-item-card";
import { Projects } from "../utilities/data";
import styled from "styled-components";
import Image from "next/image";

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
			font-size: 1.5rem;
			margin: 0;
		}
	}

	.hero-img-wrapper {
		position: relative;
		width: 90%;
		place-self: center end;
		border-radius: 1.5rem;
		aspect-ratio: 1/1;

		.img {
			border: 0.5rem solid black;
			border-radius: 1.5rem !important;
			place-self: center;
			border-radius: 1rem;
		}
		/* width: 200px; */
	}
`;

const ProjectSection = styled.section`
	background-color: #fafafa;
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
						<p>
							These are some of the projects I did that I found interesting.
							There are more coming.
						</p>

						{/* List of Projects */}
						{Projects.map((project) => (
							<ProjectItemCard project={project} />
						))}
					</Container>
				</ProjectSection>
			</main>
		</>
	);
}
