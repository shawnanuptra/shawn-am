import { Project } from "@/utilities/data";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { dmSerifDisplay } from "../utilities/fonts";

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1.3fr;
	min-height: 400px;
	border-radius: 0.5rem;
	background-color: white;

	padding: 3rem;
	margin: 2rem 0;

	transition: all 0.1s ease-out;

	box-shadow: 0px 5px 5px #c7c7c7;

	place-self: center;

	&:hover {
		transform: translateX(3px) translateY(-5px);
		cursor: pointer;
		box-shadow: -5px 10px 15px #c7c7c7;
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
		border-left: 2px solid black;
		h3 {
			margin: 0 0 1rem 0;
			font-size: 1.75rem;
		}
		p {
			margin: 0;
		}
	}
`;

interface PropInterface {
	project: Project;
}

const ProjectItemCard = ({ project }: PropInterface) => {
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

			<div className='content'>
				<h3>{project.title}</h3>
				<p>{project.description}</p>
			</div>
		</Wrapper>
	);
};

export default ProjectItemCard;
