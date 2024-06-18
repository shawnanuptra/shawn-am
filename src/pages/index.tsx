import Head from "next/head";
import { Roboto } from "next/font/google";
import { Container } from "@/components/styles";
import ProjectItemCard from "@/components/projects-item-card";
import { Projects } from "../utilities/data";

// const roboto = Roboto({ weight: ["400", "700", "900"], subsets: ["latin"] });

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
					<h1>Shawn A. Martin</h1>
					{/* todo: idea! make a good quote after every refresh on wish you all the best. */}
					<p>Welcome to my corner of the internet! Wish you all the best!</p>
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
