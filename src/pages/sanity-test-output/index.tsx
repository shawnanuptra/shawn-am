import SanityProjectItemCard from "@/components/sanity-projects-item-card";
import hljs from "highlight.js";
import js from "highlight.js/lib/languages/javascript";
import { serialize } from "next-mdx-remote/serialize";
import { groq } from "next-sanity";
import Image, { ImageProps } from "next/image";
import { useEffect } from "react";
import { sanityFetch } from "../../../sanity/lib/client";
import { Project, TESTING_QUERYResult } from "../../../sanity/types";
import { H2, H3, P, StyledA, Title } from "../projects/[slug]";

interface Props {
    projects: Project[];
    content: string;
}

export default function RenderSanityPage({ projects, content }: Props) {
    // load img url from sanity
    useEffect(() => {
        // const hljs = require("highlight.js");
        hljs.configure({});
        hljs.registerLanguage("javascript", js);
        hljs.unregisterLanguage("haskell");
        document.querySelectorAll("pre code").forEach((block) => {
            hljs.highlightElement(block as HTMLElement);
        });
    });
    const components = {
        h1: (props: any) => <Title>{props.children}</Title>,
        h2: (props: any) => <H2>{props.children}</H2>,

        h3: (props: any) => <H3>{props.children}</H3>,
        a: (props: any) => (
            <StyledA href={props.href}>{props.children}</StyledA>
        ),
        p: (props: any) => <P>{props.children}</P>,
        code: (props: any) => (
            <code style={{ whiteSpace: "pre-wrap !important" }}>
                {props.children}
            </code>
        ),
        img: (props: any) => (
            <Image
                sizes='100vw'
                width={100}
                height={20}
                style={{
                    width: "auto",
                    height: "auto",
                    maxHeight: "800px",
                    maxWidth: "100%",
                    textAlign: "center",
                    display: "block",
                    margin: "0 auto",
                }}
                {...(props as ImageProps)}
                alt={""}
            />
        ),
    };
    return (
        <div key={1} style={{ maxWidth: "500px" }}>
            {projects.map((project: Project) => (
                <SanityProjectItemCard project={project} key={project.title} />
            ))}
        </div>
    );
}

export async function getStaticProps() {
    const TESTING_QUERY = groq`*[_type=='project']{title, slug, description, thumbnail, markdownContent}`;
    const projects = await sanityFetch<TESTING_QUERYResult>({
        query: TESTING_QUERY,
    });

    const content = await serialize(projects[0]?.markdownContent as string);
    return {
        props: {
            projects,
            content,
        },
    };
}
