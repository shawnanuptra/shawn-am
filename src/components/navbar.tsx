import React from "react";
import styled from "styled-components";
import { dmSerifDisplay, roboto } from "@/utilities/fonts";

const StyledHeader = styled.div`
	display: flex;
	padding: 1rem 3vw;
	margin: 0 auto;
	justify-content: space-between;
	place-items: center;

	/* navigation */
	ul {
		display: flex;
		flex-direction: row;
		list-style-type: none;
		padding: 0;
		gap: 5rem;
		place-items: center;
	}

	box-shadow: 0px 10px 35px #e6e6e6;
`;

const Logo = styled.span`
	font-size: 1.5rem;
	font-weight: bold;
	span {
		font-weight: normal;
	}

	cursor: pointer;
`;

const SayHi = styled.li`
	background-color: purple;
	color: white;
	padding: 0.7rem 1.5rem;
	border-radius: 0.5rem;
`;

const Navbar = () => {
	return (
		<StyledHeader>
			<Logo className={roboto.className}>
				Shawn A. M.<span className={roboto.className}> Portfolio</span>
			</Logo>
			<nav>
				<ul>
					<li>Projects</li>
					<li>Resume</li>
					<SayHi>Say hi!</SayHi>
				</ul>
			</nav>
		</StyledHeader>
	);
};

export default Navbar;
