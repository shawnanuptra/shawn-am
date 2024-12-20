import { Projects, SocialLinks } from "@/utilities/data";
import { device } from "@/utilities/deviceSize";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import styled from "styled-components";
import { Container } from "./styles";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
	color: #fafafa;
	background-color: #202020;

	.home-link {
		display: inline;
		font-weight: 400;
		font-size: 1.3rem;

		padding: 0.7rem 1.5rem;
		border-radius: 0.5rem;
		transition: all 0.1s ease-out;
		cursor: pointer;

		&:focus-visible,
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
		padding: 0;

		.project-item {
			padding: 0.7rem 1.5rem;
			border-radius: 0.5rem;
			transition: all 0.1s ease-out;

			cursor: pointer;
			font-size: 1rem;

			list-style: none;

			&:focus-within,
			&:hover {
				transform: translateX(1px) translateY(-1px);
				box-shadow: -5px 5px 0px #fafafa;
				outline: 2px solid #fafafa;
			}

			/* focus-rings replaced by hover state */
			a {
				outline: none;
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
			padding: 0.5rem;
			border-radius: 0.5rem;
			transition: all 0.1s ease-out;
			display: grid;
			place-content: center;

			&:focus-within,
			&:hover {
				transform: translateX(1px) translateY(-1px);
				box-shadow: -5px 5px 0px #fafafa;
				outline: 2px solid #fafafa;
			}
		}
	}

	@media ${device.sm} {
		.home-link {
			font-size: 1rem;
		}
		display: grid;
		grid-template-areas:
			"logo logo"
			"projects socials"
			"copyright copyright";
		grid-template-columns: 2fr 1fr;
		align-items: flex-start;
		.home-link {
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
				padding: 0.2rem;
			}
		}

		.copyright {
			grid-area: copyright;
			font-size: 0.7rem;
			color: #ffffffbc;
		}
	}
`;

const FooterContainer = styled.footer`
	background-color: #202020;
	color: #fafafa;
	margin-top: auto;
`;

const Footer = () => {
	return (
		<FooterContainer>
			<Container>
				<Wrapper>
					<Link className="home-link" href={"/"}>
						<strong>Shawn A. M.</strong> Portfolio
					</Link>
					<ul className="projects">
						{Projects.map((project) => (
							<li className="project-item" key={project.title}>
								<Link href={`/projects/${project.slug}`}>{project.title}</Link>
							</li>
						))}
					</ul>
					<div className="socials">
						<a href={SocialLinks.linkedIn} aria-label="LinkedIn link" target="_blank">
							<FaLinkedin aria-hidden />
						</a>

						<a href={SocialLinks.github} aria-label="Github link" target="_blank">
							<FaGithub aria-hidden />
						</a>
					</div>
					<p className="copyright">Shawn A. Martin @ 2024</p>
				</Wrapper>
			</Container>
		</FooterContainer>
	);
};

export default Footer;
