import { device } from "@/utilities/deviceSize";
import { inter } from "@/utilities/fonts";
import Link from "next/link";
import styled from "styled-components";

const StyledHeader = styled.header`
	position: relative;
	z-index: 100;
	padding: 1rem 3vw;
	justify-content: space-between;
	place-items: center;
	font-size: 14px;
	background-color: #fafafa;

	/* navigation */
	ul {
		margin: 0;
		display: flex;
		flex-direction: row;
		list-style-type: none;
		padding: 0;
		gap: 5rem;
		place-items: center;

		li {
			transition: all 0.1s ease-out;
		}

		/* font-size of nav links */
		.stretched-link {
			font-size: 0.875rem;
		}

		.my-li {
			position: relative;
			padding: 0.7rem 1.5rem;
			border-radius: 0.5rem;
			transition: all 0.1s ease-out;

			&:focus-within,
			&:hover {
				transform: translateX(1px) translateY(-1px);
				box-shadow: -5px 5px 0px #202020;
				outline: 2px solid #202020;
			}
		}
	}

	.mobileMenu,
	.modal,
	.modal-outer {
		display: none;
	}

	@media ${device.sm} {
		ul {
			display: none;
		}

		.modal-outer {
			background: transparent;
			height: 100vh;
			width: 100%;
			position: absolute;
			z-index: 98;
			top: 68px;
			left: 0;
		}

		.modal {
			display: none;
			width: 100%;
			flex-direction: column;
			color: #fafafa;
			background: #202020;
			position: absolute;
			top: 0;
			left: 0;

			z-index: 99;

			& > * {
				padding: 1rem;
			}
		}

		// hamburger
		.mobileMenu {
			display: flex;
			flex-direction: column;
			padding: 1rem;
			.line {
				content: "";
				width: 1rem;
				background-color: #202020;
				height: 2px;
				border-radius: 99px;
				position: relative;
				&::before {
					content: "";
					width: 1rem;
					background-color: #202020;
					height: 2px;
					border-radius: 99px;
					position: absolute;
					bottom: 5px;
				}
				&::after {
					content: "";
					width: 1rem;
					background-color: #202020;
					height: 2px;
					border-radius: 99px;
					position: absolute;
					top: 5px;
				}
			}
		}
		.open {
			display: flex;
		}
	}
	box-shadow: 0px 10px 35px #e6e6e6;
`;

const Logo = styled.span`
	font-size: 1.3rem;
	font-weight: bold;
	span {
		font-weight: normal;
	}

	cursor: pointer;

	@media ${device.sm} {
		font-size: 1rem;
	}
`;

const SayHi = styled.li`
	position: relative;
	background-color: #202020;
	color: white;
	padding: 0.7rem 1.5rem;
	border-radius: 0.5rem;
	white-space: nowrap;

	&:focus-within,
	&:hover {
		transform: translateX(1px) translateY(-1px);
		box-shadow: -5px 5px 0px #202020;
		color: #202020;
		background-color: #fafafa;
		outline: 2px solid #202020;
	}
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	gap: 2rem;
	justify-content: space-between;
	place-items: center;
	max-width: 1200px;
	margin: 0 auto;
`;

const Navbar = () => {
	let modal: Element;
	let modalOuter: Element;
	if (typeof window !== "undefined") {
		modal = document.getElementsByClassName("modal")[0];
		modalOuter = document.getElementsByClassName("modal-outer")[0];
	}
	const handleClick = () => {
		modal.classList.toggle("open");
		modalOuter.classList.toggle("open");
	};
	const handleOuterModalClick = () => {
		modal.classList.contains("open") ? handleClick() : null;
	};

	return (
		<>
			<StyledHeader>
				<Wrapper>
					<Logo className={inter.className}>
						<Link href={"/"}>
							Shawn A. M.
							<span className={inter.className}> Portfolio</span>
						</Link>
					</Logo>
					<nav>
						<ul>
							<li className="my-li">
								<Link className="stretched-link" href={"/projects"}>
									Projects
								</Link>
							</li>
							<li className="my-li">
								<Link className="stretched-link" href={"/blog"}>
									Blog
								</Link>
							</li>
							<li className="my-li">
								<Link className="stretched-link" href={"/today-i-learned"}>
									Today I Learned
								</Link>
							</li>
							<SayHi>
								<a
									className="stretched-link"
									href="mailto: shawnanuptraamartin@gmail.com"
									target="_blank"
								>
									Say hi!
								</a>
							</SayHi>
						</ul>
						<div className="mobileMenu" onClick={handleClick}>
							<div className="line"></div>
						</div>
					</nav>
				</Wrapper>
				<div className="modal-outer" onClick={handleOuterModalClick}>
					<nav className="modal" onClick={handleClick}>
						<Link href={"/projects"}>Projects</Link>

						<Link href={"/blog"}>Blog</Link>
						<Link href={"/today-i-learned"}>Blog</Link>
						<a href="mailto: shawnanuptraamartin@gmail.com" target="_blank">
							Say hi!
						</a>
					</nav>
				</div>
			</StyledHeader>
		</>
	);
};

export default Navbar;
