import React from "react";
import styled from "styled-components";
import { dmSerifDisplay, inter } from "@/utilities/fonts";
import { Container } from "./styles";

const StyledHeader = styled.div`
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

	box-shadow: 0px 10px 35px #e6e6e6;
`;

const Logo = styled.span`
	font-size: 1.3rem;
	font-weight: bold;
	span {
		font-weight: normal;
	}

	cursor: pointer;
`;

const SayHi = styled.li`
	background-color: black;
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
	return (
		<StyledHeader>
			<Wrapper>
				<Logo className={inter.className}>
					Shawn A. M.<span className={inter.className}> Portfolio</span>
				</Logo>
				<nav>
					<ul>
						<li>Projects</li>
						<li>Resume</li>
						<SayHi>Say hi!</SayHi>
					</ul>
				</nav>
			</Wrapper>
		</StyledHeader>
	);
};

export default Navbar;
