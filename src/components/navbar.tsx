import React, { useState } from "react";
import styled from "styled-components";
import { dmSerifDisplay, inter } from "@/utilities/fonts";
import { Container } from "./styles";
import Link from "next/link";
import { device } from "@/utilities/deviceSize";

const StyledHeader = styled.div`
	position: relative;
	z-index: 100;
	/* display: flex; */
	padding: 1rem 3vw;
	/* margin: 0 auto; */
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
			// todo: don't use static number of 68px (height of navbar)!!
			/* top: 68px; */
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
	background-color: #202020;
	color: white;
	padding: 0.7rem 1.5rem;
	border-radius: 0.5rem;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
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
							Shawn A. M.<span className={inter.className}> Portfolio</span>
						</Link>
					</Logo>
					<nav>
						<ul>
							<Link href={"/#projects"}>
								<li>Projects</li>
							</Link>
							<a href='/Shawn-CV.pdf' download={"Shawn-CV"}>
								<li>Resume</li>
							</a>
							<a href='mailto: shawnanuptraamartin@gmail.com' target='_blank'>
								<SayHi>Say hi!</SayHi>
							</a>
						</ul>
						<div className='mobileMenu' onClick={handleClick}>
							<div className='line'></div>
						</div>
					</nav>
				</Wrapper>
				<div className='modal-outer' onClick={handleOuterModalClick}>
					<nav className='modal' onClick={handleClick}>
						<Link href={"/#projects"}>Projects</Link>
						<a href='/Shawn-CV.pdf' download={"Shawn-CV"}>
							Resume
						</a>
						<a href='mailto: shawnanuptraamartin@gmail.com' target='_blank'>
							Say hi!
						</a>
					</nav>
				</div>
			</StyledHeader>
		</>
	);
};

export default Navbar;
