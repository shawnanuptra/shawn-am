import { device } from "@/utilities/deviceSize";
import Image from "next/image";
import Link from "next/link";
import type { Image as ImgSrc } from "sanity";
import styled from "styled-components";
import { urlForImage } from "../../sanity/lib/image";
import { Project } from "../../sanity/types";
const Wrapper = styled.article`
	position: relative;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: minmax(200px, auto) 1fr;
	gap: 1rem;

	width: 100%;
	height: 100%;

	border-radius: 1rem;
	background-color: white;

	border: 0.5rem solid #202020;

	padding: 3rem;

	transition: all 0.1s ease-out;

	box-shadow: -5px 10px 0px #202020;

	place-self: center;

	&:focus-within,
	&:hover {
		transform: translateX(3px) translateY(-5px);
		cursor: pointer;
		box-shadow: -13px 18px 0px #202020;
	}

	.image-wrapper {
		grid-row: 1;
		position: relative;
		width: 100%;
		height: 100%;
	}

	.content {
		p {
			margin: 0;
		}
	}

	.separator {
		content: "";
		height: 0.3rem;
		background-color: #202020;
		border-radius: 99px;
		height: 100%;
	}

	.stretched-link {
		font-size: 2rem;
		line-height: 1.1;
		font-weight: bold;

		margin: 0 0 1rem 0;
	}

	@media ${device.sm} {
		padding: 1rem;
		grid-template-rows: minmax(100px, 1fr) auto;
		border-width: 0.4rem;

		.stretched-link {
			font-size: 1.5rem;
		}

		.content {
			padding: 1rem;

			p {
				font-size: 1rem;
			}
		}
	}
`;

interface PropInterface {
	project: Project;
}

const ProjectItemCard = ({ project }: PropInterface) => {
	//todo: add more details on hover! maybe like stars or something?
	return (
		<Wrapper>
			<div className="content">
				<Link
					aria-label={"Read more about my project: " + project.title}
					href={`/projects/${project.slug?.current}`}
					className="stretched-link"
				>
					{project.title}
				</Link>
				<p>{project.description}</p>
			</div>

			<div className="image-wrapper">
				<Image
					// loader={({ width, quality = 100 }) =>
					//     urlForImage(project?.thumbnail as ImgSrc)
					// }
					src={urlForImage(project?.thumbnail as ImgSrc)}
					alt={""}
					aria-hidden={true}
					fill={true}
					sizes={`${device.sm} 90vw, 40vw`}
					style={{ objectFit: "contain" }}
				/>
			</div>
		</Wrapper>
	);
};

export default ProjectItemCard;
