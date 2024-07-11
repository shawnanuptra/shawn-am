import { getSession, GetSessionParams } from "next-auth/react";

const Dashboard = ({ session }: any) => {
    return (
        <div>
            <div>
                {session?.user?.email == "shawnanuptraamartin@gmail.com"
                    ? session?.user?.email
                    : session?.user?.email}
            </div>
        </div>
    );
};

export default Dashboard;

export async function getServerSideProps(ctx: GetSessionParams | undefined) {
    const session = await getSession(ctx);
    console.log(session, "this is session in server");
    // if no session, redirect to home
    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    return { props: { session } };
}
