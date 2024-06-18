import styled, { createGlobalStyle } from "styled-components";

export const Container = styled.div`
	max-width: 1200px;
	/* background-color: teal; */
	margin: 0 auto;
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

* {
    box-sizing: border-box;
}
`;
