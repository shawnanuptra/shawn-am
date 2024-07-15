import { BlogContainer, components } from "@/pages/projects/[slug]";
import hljs from "highlight.js";
import js from "highlight.js/lib/languages/javascript";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { groq } from "next-sanity";
import { ParsedUrlQuery } from "querystring";
import { useEffect } from "react";
import { sanityFetch } from "../../../../sanity/lib/client";
import {
    GET_PROJECT_DATA_QUERYResult,
    GET_PROJECTS_SLUG_QUERYResult,
} from "../../../../sanity/types";

interface Props {
    mdxSource: MDXRemoteSerializeResult;
}

const SanityProjectPage = ({ mdxSource }: Props) => {
    useEffect(() => {
        // const hljs = require("highlight.js");
        hljs.configure({});
        hljs.registerLanguage("javascript", js);
        hljs.unregisterLanguage("haskell");
        document.querySelectorAll("pre code").forEach((block) => {
            hljs.highlightElement(block as HTMLElement);
        });
    });
    return (
        <>
            <BlogContainer>
                <MDXRemote {...mdxSource} components={components} />
            </BlogContainer>

            {/* Highlight.js so don't go through build system */}
        </>
    );
};

export default SanityProjectPage;

// getStaticPaths for paths of projects
export const getStaticPaths: GetStaticPaths = async () => {
    const GET_PROJECTS_SLUG_QUERY = groq`*[_type=='project']{slug}`;
    const slugs = await sanityFetch<GET_PROJECTS_SLUG_QUERYResult>({
        query: GET_PROJECTS_SLUG_QUERY,
    });
    const paths = slugs.map(({ slug }) => ({
        params: {
            slug: slug?.current,
        },
    }));
    return { paths, fallback: false };
};

interface IParams extends ParsedUrlQuery {
    slug: string;
}

// getStaticProps to get project information from server
export const getStaticProps: GetStaticProps = async (context) => {
    const { slug } = context.params as IParams;
    const GET_PROJECT_DATA_QUERY = groq`*[_type=='project' && slug.current==$slug][0]{title, markdownContent}`;
    const project = await sanityFetch<GET_PROJECT_DATA_QUERYResult>({
        query: GET_PROJECT_DATA_QUERY,
        params: {
            slug: slug,
        },
    });

    const mdxSource = await serialize(project?.markdownContent as string);

    return { props: { mdxSource } };
};
