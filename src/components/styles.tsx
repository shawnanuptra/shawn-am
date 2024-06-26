import styled, { createGlobalStyle } from "styled-components";

export const Container = styled.div`
	max-width: 1200px;
	/* background-color: teal; */
	margin: 0 auto;
	padding: 5rem 0;
`;

export const GlobalStyles = createGlobalStyle`
html,
body {
    padding: 0;
    margin: 0;
    background-color: #F0F0F0;
}

a {
    color: inherit;
    text-decoration: none;
}

p {
    font-size: 1.3rem;
}

* {
    box-sizing: border-box;
}
`;
