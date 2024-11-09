import { device } from "@/utilities/deviceSize";
import styled, { createGlobalStyle } from "styled-components";

export const Container = styled.div`
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	padding: 5rem 3vw;

	@media ${device.sm} {
		padding: 1rem;
	}
`;

export const GlobalStyles = createGlobalStyle`
html,
body {
    padding: 0;
    margin: 0;
    background-color: #FDFDFD;
    scroll-behavior: smooth;
    color: #202020;
}

a {
    color: inherit;
    text-decoration: none;
}

p {
    font-size: 1.125rem;
    line-height: 1.4;

}

* {
    box-sizing: border-box;
}

*:focus-visible	{
	outline: 3px solid orange;
}

.stretched-link {
	font-size: 1.125rem;

	/*  stretching the <a>, making the card accessible */
	&::after {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		content: "";
	}

	/* focus state is already stated in Wrapper */
	&:focus {
		outline: none;
	}
}
`;
