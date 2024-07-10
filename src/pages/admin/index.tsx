"use client";
import { Container } from "@/components/styles";
import { signIn, signOut, getSession, GetSessionParams } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "styled-components";

const Button = styled.button`
    display: flex;
    margin: 0 auto;
    padding: 2rem;
    background-color: #202020;
    color: #fafafa;
    border: 0;
    transition: 0.1s all ease-in;
    border-radius: 0.5rem;
    &:hover {
        transform: translateX(1px) translateY(-1px);
        box-shadow: -5px 5px 0px #202020;
        color: #202020;
        background-color: #fafafa;
        outline: 2px solid #202020;
        cursor: pointer;
    }
    &:last-of-type {
        margin-top: 2rem;
    }
`;
const Login = ({ session }: any) => {
    const router = useRouter();

    // UI if the user is signed in
    if (session?.user?.email) {
        return (
            <Container>
                Signed in as {session?.user?.email} <br />
                <Button onClick={() => router.push("/admin/dashboard")}>
                    To Dashboard
                </Button>
                <Button onClick={() => signOut()}>Sign out</Button>
            </Container>
        );
    } else {
        // UI if the user is not signed in
        return (
            <Container>
                <Button onClick={() => signIn()}>Sign in</Button>
            </Container>
        );
    }
};

export default Login;

export async function getServerSideProps(ctx: GetSessionParams | undefined) {
    const session = await getSession(ctx);
    return { props: { session } };
}
