import React from "react";
import styled from "styled-components";
import { Container } from "./styles";
import { Projects, SocialLinks } from "@/utilities/data";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

const Wrapper = styled.footer`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
	color: white;
	background-color: black;

	h2 {
		display: inline;
		font-weight: 400;
		font-size: 1.3rem;
	}

	p {
		font-size: 1rem;
	}

	.projects {
		display: flex;
		flex-direction: row;
		gap: 3rem;
		.project-item {
			/* font-weight: bold; */
			cursor: pointer;
			font-size: 1rem;
		}
	}
	.socials {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		font-size: 1.5rem;
		margin: 1rem 0;
	}
`;

const FooterContainer = styled.div`
	background-color: black;
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
					<p>Shawn A. Martin @ 2024</p>
				</Wrapper>
			</Container>
		</FooterContainer>
	);
};

export default Footer;
