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
	grid-template-rows: 1fr 1fr;
	gap: 1rem;

	width: 100%;
	height: 100%;

	min-height: 200px;
	border-radius: 0.4rem;
	background-color: white;

	border: 1px solid #202020;
	border-width: 0.2rem;
	padding: 1rem;

	transition: all 0.1s ease-out;

	&:focus-within,
	&:hover {
		cursor: pointer;
		background-color: #202020;
		color: #fafafa;
	}

	.image-wrapper {
		position: relative;
		width: 100%;
		height: 100%;

		grid-row: 1;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.separator {
		content: "";
		height: 0.3rem;
		background-color: #202020;
		border-radius: 99px;
		height: 100%;
	}

	@media ${device.sm} {
		.content {
			p {
				font-size: 1rem;
			}
		}
	}
`;

interface PropInterface {
	project: Project;
}

const AllProjectItemCard = ({ project }: PropInterface) => {
	//todo: add more details on hover! maybe like stars or something?
	return (
		<Wrapper>
			<div className="content">
				<Link href={`/projects/${project.slug?.current}`} className="stretched-link">
					{project.title}
				</Link>
			</div>
			<div className="image-wrapper">
				<Image
					// loader={({ width, quality = 100 }) =>
					//     urlForImage(project?.thumbnail as ImgSrc)
					// }
					src={urlForImage(project?.thumbnail as ImgSrc)}
					alt={("thumbnail of " + project.title) as string}
					fill={true}
					sizes={`${device.sm} 90vw, 40vw`}
					style={{ objectFit: "contain" }}
				/>
			</div>
		</Wrapper>
	);
};

export default AllProjectItemCard;
