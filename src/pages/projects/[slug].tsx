import { Project, Projects } from "@/utilities/data";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { promises as fs } from "fs";
import styled from "styled-components";
import Image, { ImageProps } from "next/image";
import { useEffect } from "react";
import { device } from "@/utilities/deviceSize";
import hljs from "highlight.js";
import js from "highlight.js/lib/languages/javascript";
interface Props {
    mdxSource: MDXRemoteSerializeResult;
}

const BlogContainer = styled.div`
    max-width: 1000px;
    margin: 5rem auto;
    border: 2px solid #202020;
    padding: 2.5rem;
    border-radius: 1.25rem;

    background-color: #fafafa;

    @media ${device.sm} {
        border: 0;
        margin: 0 auto;
    }
`;

const Title = styled.h1`
    font-size: 3rem;
    /* padding-bottom: 1rem;
	border-bottom: 1px solid grey; */
    @media ${device.sm} {
        font-size: 2.5rem;
    }
`;
const H2 = styled.h2`
    font-size: 2rem;
    margin: 2.5rem 0 2rem;
    padding-top: 2.5rem;
    border-top: 1px solid grey;
`;
const H3 = styled.h3`
    font-size: 1.5rem;
    margin-top: 3rem;
`;

const StyledA = styled.a`
    color: #202020;
    text-decoration: underline;
    cursor: pointer;
    font-weight: bold;
    white-space: wrap;
`;

const P = styled.p`
    margin: 1.25rem 0;
    color: #202020d5;
    @media ${device.sm} {
        font-size: 1rem;
        margin: 0 auto;
    }
`;

const components = {
    h1: (props: any) => <Title>{props.children}</Title>,
    h2: (props: any) => <H2>{props.children}</H2>,
    h3: (props: any) => <H3>{props.children}</H3>,
    a: (props: any) => <StyledA href={props.href}>{props.children}</StyledA>,
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

const ProjectPage = ({ mdxSource }: Props) => {
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

export default ProjectPage;

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
    // Call an external API endpoint to get posts
    // const res = await fetch("https://.../posts");
    // const posts = await res.json();

    // Get the paths we want to pre-render based on posts
    const paths = Projects.map((project) => ({
        params: {
            slug: project.slug,
        },
    }));

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false };
};

interface IParams extends ParsedUrlQuery {
    slug: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { slug } = context.params as IParams;

    // MDX text - can be from a local file, database, CMS, fetch, anywhere...
    const res = await fs.readFile(`src/markdown/${slug}.md`, "utf-8");
    // const mdxText = await res.text();
    const mdxSource = await serialize(res);
    return { props: { mdxSource } };
};
