import SanityProjectItemCard from "@/components/sanity-projects-item-card";
import { groq } from "next-sanity";
import { sanityFetch } from "../../../sanity/lib/client";
import { GET_PROJECTS_QUERYResult, Project } from "../../../sanity/types";

interface Props {
    projects: Project[];
}

export default function RenderSanityPage({ projects }: Props) {
    return (
        <div key={1} style={{ maxWidth: "500px" }}>
            {projects.map((project: Project) => (
                <SanityProjectItemCard project={project} key={project.title} />
            ))}
        </div>
    );
}

export async function getStaticProps() {
    const GET_PROJECTS_QUERY = groq`*[_type=='project']{title, slug, description, thumbnail, markdownContent}`;
    const projects = await sanityFetch<GET_PROJECTS_QUERYResult>({
        query: GET_PROJECTS_QUERY,
    });

    return {
        props: {
            projects,
        },
    };
}
