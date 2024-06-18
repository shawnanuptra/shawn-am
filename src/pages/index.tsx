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
		border-radius: 1rem;
		aspect-ratio: 1/1;

		.img {
			place-self: center;
			/* height: 100%; */
			border-radius: 1rem;
			/* border-radius: 42% 10% 45% 10% / 30% 10% 35% 10%; */
		}
		/* width: 200px; */
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
					<section>
						<h2>Projects</h2>
						<p>
							These are some of the projects I did that I found interesting.
							There are more coming.
						</p>

						{/* List of Projects */}
						{Projects.map((project) => (
							<ProjectItemCard project={project} />
						))}
					</section>
				</Container>
			</main>
		</>
	);
}
