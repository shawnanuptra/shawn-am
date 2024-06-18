export interface Project {
	title: string;
	description: string;
	imgSource: string;
}

export const Projects: Project[] = [
	{
		title: "Flappy Bird Clone",
		description: "A simple web-based game that uses vanilla JavaScript to run.",
		imgSource: "/flappy-bird.png",
	},
	{
		title: "Bridle Path Damage Reporting App",
		description:
			"This mobile-first website is created for an artificial use case of reporting bridle path damage. It was an assignment during my study in Sunderland Uni.",
		imgSource: "/bridle-path.png",
	},
	{
		title: "Cafe Mobile App with Flutter",
		description:
			"This project is the focus of my final year project at the University of Sunderland. I work as a barista, thus the combining of my passions of coffee and technology is exciting!",
		imgSource: "/cameo.png",
	},
	{
		title: "API with CRUD Functionality with Express",
		description:
			"This project is about making an API to access a local data. The API works within a Node.js application wrapped in Express. An automatic API doc was also used using auto-generated documentation by APIDOC.",
		imgSource: "/express.png",
	},
];