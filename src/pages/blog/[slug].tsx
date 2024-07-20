import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { groq } from "next-sanity";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { sanityFetch } from "../../../sanity/lib/client";
import { BlogContainer, components, Title } from "../projects/[slug]";
interface Props {
    mdxSource: MDXRemoteSerializeResult;
    blogTitle: string;
}

const BlogPostPage = ({ mdxSource, blogTitle }: Props) => {
    return (
        <>
            <Head>
                <title>{blogTitle}</title>
                <meta
                    property='og:title'
                    content={"Shawn A. M. | " + blogTitle}
                />
            </Head>
            <BlogContainer>
                <Title>{blogTitle}</Title>
                <MDXRemote {...mdxSource} components={components} />
            </BlogContainer>

            {/* Highlight.js so don't go through build system */}
        </>
    );
};

export default BlogPostPage;

// getStaticPaths for paths of projects
export const getStaticPaths: GetStaticPaths = async () => {
    const GET_PROJECTS_SLUG_QUERY = groq`*[_type=='blog']{slug}`;
    const slugs = await sanityFetch<any>({
        query: GET_PROJECTS_SLUG_QUERY,
    });
    const paths = slugs.map(({ slug }: any) => ({
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
    const GET_PROJECT_DATA_QUERY = groq`*[_type=='blog' && slug.current==$slug][0]{title, markdownContent}`;
    const blog = await sanityFetch<any>({
        query: GET_PROJECT_DATA_QUERY,
        params: {
            slug: slug,
        },
    });

    const mdxSource = await serialize(blog?.markdownContent as string);
    const blogTitle = blog?.title;
    return { props: { mdxSource, blogTitle } };
};
