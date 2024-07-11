import NextAuth from "next-auth/next";
import GithubProfile from "next-auth/providers/github";

export default NextAuth({
    providers: [
        GithubProfile({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
    callbacks: {
        // only allow sign in from my email
        async signIn({ user }) {
            console.log(user.email, "hit async callback");
            if (user.email == "shawnanuptraamartin@gmail.com") {
                return true;
            } else {
                return false;
            }
        },
    },
    secret: process.env.NEXTAUTH_SECRET as string,
});
