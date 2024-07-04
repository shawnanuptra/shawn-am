import React from "react";
import styled from "styled-components";
import { Container } from "./styles";
import { Projects, SocialLinks } from "@/utilities/data";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { device } from "@/utilities/deviceSize";

const Wrapper = styled.footer`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
	color: #fafafa;
	background-color: #202020;

	h2 {
		display: inline;
		font-weight: 400;
		font-size: 1.3rem;

		padding: 0.7rem 1.5rem;
		border-radius: 0.5rem;
		transition: all 0.1s ease-out;

		&:hover {
			transform: translateX(1px) translateY(-1px);
			box-shadow: -5px 5px 0px #fafafa;
			outline: 2px solid #fafafa;
		}
	}

	p {
		font-size: 1rem;
	}

	.projects {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		.project-item {
			/* font-weight: bold; */
			cursor: pointer;
			font-size: 1rem;

			padding: 0.7rem 1.5rem;
			border-radius: 0.5rem;
			transition: all 0.1s ease-out;

			&:hover {
				transform: translateX(1px) translateY(-1px);
				box-shadow: -5px 5px 0px #fafafa;
				outline: 2px solid #fafafa;
			}
		}
	}
	.socials {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		font-size: 1.5rem;
		margin: 1rem 0;

		& > * {
			padding: 0.5rem 1rem;
			border-radius: 0.5rem;
			transition: all 0.1s ease-out;

			&:hover {
				transform: translateX(1px) translateY(-1px);
				box-shadow: -5px 5px 0px #fafafa;
				outline: 2px solid #fafafa;
			}
		}
	}

	@media ${device.sm} {
		h2 {
			font-size: 1rem;
		}
		display: grid;
		grid-template-areas:
			"logo logo"
			"projects socials"
			"copyright copyright";
		grid-template-columns: 2fr 1fr;
		align-items: flex-start;
		h2 {
			grid-area: logo;
			padding: 0.2rem 0;
		}
		.projects {
			display: flex;
			flex-direction: column;
			gap: 3px;
			grid-area: projects;
			.project-item {
				font-size: 0.8rem;
				margin: 0;
				padding: 0.2rem 0;
			}
		}

		.socials {
			display: flex;
			flex-direction: row;
			gap: 0.5rem;
			margin: 0 0 0 1.5rem;
			grid-area: socials;
			& > * {
				padding: 0 0.2rem;
			}
		}

		.copyright {
			grid-area: copyright;
			font-size: 0.7rem;
			color: #ffffffbc;
		}
	}
`;

const FooterContainer = styled.div`
	background-color: #202020;
	color: #fafafa;
	margin-top: 5rem;
`;
const Footer = () => {
	return (
		<FooterContainer>
			<Container>
				<Wrapper>
					<h2>
						<Link href={"/"}>
							<strong>Shawn A. M.</strong> Portfolio
						</Link>
					</h2>
					<div className='projects'>
						{Projects.map((project) => (
							<Link href={`/projects/${project.slug}`}>
								<p className='project-item'>{project.title}</p>
							</Link>
						))}
					</div>
					<div className='socials'>
						<a href={SocialLinks.linkedIn} target='_blank'>
							<FaLinkedin />
						</a>

						<a href={SocialLinks.github} target='_blank'>
							<FaGithub />
						</a>
					</div>
					<p className='copyright'>Shawn A. Martin @ 2024</p>
				</Wrapper>
			</Container>
		</FooterContainer>
	);
};

export default Footer;
