"use client";
import { signIn, signOut, getSession, GetSessionParams } from "next-auth/react";
import { useRouter } from "next/router";

const Login = ({ session }: any) => {
    if (session?.user?.email) {
        console.log(session);
        return (
            <>
                Signed in as {session?.user?.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        );
    } else {
        return (
            <>
                <button onClick={() => signIn()}>Sign in</button>
            </>
        );
    }
};

export default Login;

export async function getServerSideProps(ctx: GetSessionParams | undefined) {
    const session = await getSession(ctx);
    return { props: { session } };
}
