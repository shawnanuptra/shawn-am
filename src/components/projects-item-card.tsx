import { Project } from "@/utilities/data";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { dmSerifDisplay } from "../utilities/fonts";
import Link from "next/link";
import { device } from "@/utilities/deviceSize";

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr 1fr;

	width: 100%;
	height: 100%;

	min-height: 400px;
	border-radius: 1rem;
	background-color: white;

	border: 0.5rem solid #202020;

	padding: 2rem;
	margin: 0 0 4rem 0;

	transition: all 0.1s ease-out;

	box-shadow: -5px 10px 0px #202020;

	place-self: center;

	&:hover {
		transform: translateX(3px) translateY(-5px);
		cursor: pointer;
		box-shadow: -13px 18px 0px #202020;
	}

	.image-wrapper {
		position: relative;
		width: 100%;
		height: auto;
	}

	.content {
		padding: 2rem;
		h3 {
			margin: 0 0 1rem 0;
			font-size: 2rem;
		}
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

	@media ${device.sm} {
		padding: 1rem;
		grid-template-rows: 1fr auto;
		margin: 0 0 1rem 0;
		border-width: 0.4rem;

		.content {
			padding: 1rem;
			h3 {
				font-size: 1.5rem;
			}
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
		<Link href={`/projects/${project.slug}`}>
			<Wrapper>
				<div className='image-wrapper'>
					<Image
						src={project.imgSource}
						alt='temporary'
						fill={true}
						sizes={`(max-width: ${device.sm}) 90vw, 40vw`}
						style={{ objectFit: "contain" }}
					/>
				</div>
				<div className='content'>
					<h3>{project.title}</h3>
					<p>{project.description}</p>
				</div>
			</Wrapper>
		</Link>
	);
};

export default ProjectItemCard;
