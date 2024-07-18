import { device } from "@/utilities/deviceSize";
import styled, { createGlobalStyle } from "styled-components";

export const Container = styled.div`
    max-width: 1200px;
    /* background-color: teal; */
    margin: 0 auto;
    padding: 5rem 3vw;

    @media ${device.sm} {
        max-width: 90vw;
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
`;
