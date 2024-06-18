import { Project } from "@/utilities/data";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { dmSerifDisplay } from "../utilities/fonts";

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr auto 1.3fr;
	min-height: 400px;
	border-radius: 1rem;
	background-color: white;

	border: 0.5rem solid black;

	padding: 3rem;
	margin: 0 0 4rem 0;

	transition: all 0.1s ease-out;

	box-shadow: -5px 10px 0px #000;

	place-self: center;

	&:hover {
		transform: translateX(3px) translateY(-5px);
		cursor: pointer;
		box-shadow: -13px 18px 0px #000;
	}

	.image-wrapper {
		position: relative;
		width: 100%;
		.img {
			padding: 1rem;
		}
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
		width: 0.3rem;
		background-color: black;
		border-radius: 99px;
		height: 100%;
	}
`;

interface PropInterface {
	project: Project;
}

const ProjectItemCard = ({ project }: PropInterface) => {
	//todo: add more details on hover! maybe like stars or something?
	return (
		<Wrapper>
			<div className='image-wrapper'>
				<Image
					src={project.imgSource}
					alt='temporary'
					fill={true}
					objectFit='contain'
					className='img'
				/>
			</div>
			<div className='separator'></div>

			<div className='content'>
				<h3>{project.title}</h3>
				<p>{project.description}</p>
			</div>
		</Wrapper>
	);
};

export default ProjectItemCard;
