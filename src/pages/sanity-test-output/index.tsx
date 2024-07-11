import { PortableText } from "@portabletext/react";
import { SanityDocument } from "next-sanity";
import { sanityFetch } from "../../../sanity/lib/client";

const PROJECTS_QUERY = `*[_type=='project']{title, slug, description, thumbnail}`;

export default function RenderSanityPage({ projects }: SanityDocument) {
    const components = {
        // todo: find out how to markdown->portabletext->renderinpage. maybe sanity-markdown?
    };
    return (
        <div key={1}>
            {projects.map((project: any) => (
                <div key={project.title}>
                    <h2>{project.title}</h2>
                    <span>{project.description + project.slug.current}</span>
                    <div className='portable-text'>
                        <PortableText
                            value={project.content}
                            components={components}
                        />
                    </div>
                </div>
            ))}
        </div>

        //     {projects.map((project: any) => (
        //         <div key={project._id}>{project.slug}</div>
        //         // <div>{project.title + project.slug}</div>
        //     ))}
    );
}

export async function getStaticProps() {
    const projects = await sanityFetch<SanityDocument[]>({
        query: `*[_type=='project']{title, slug, description, thumbnail, content}`,
    });

    console.log(projects, "AAAAAA");

    return {
        props: {
            projects,
        },
    };
}
