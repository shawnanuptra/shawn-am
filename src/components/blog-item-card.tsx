import { device } from "@/utilities/deviceSize";
import Link from "next/link";
import styled from "styled-components";

const Content = styled.div`
	h2 {
		font-size: clamp(1.5rem, 3vw, 2rem);
		line-height: 1.1;
		margin: 0;
	}
	time,
	.series {
		margin: 0;
	}

	.series {
		font-style: italic;
	}

	@media ${device.sm} {
		time,
		.series {
			font-size: 0.8rem;
			margin: 0;
		}

		.series {
			font-style: italic;
		}
		p {
			margin: 0;
			font-size: 0.9rem;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			overflow: hidden;
			/* Set the number of lines you want to display */
			-webkit-line-clamp: 3; /* Change '3' to the desired number of lines */
		}
	}

	.read-more {
		font-weight: bold;
		margin: 1rem 0 0 0;
	}
`;

const Wrapper = styled.article`
	padding: 2rem 3vw;
	transition: all 0.1s ease-out;
	&:hover {
		color: #fafafa;
		background-color: #202020;
		cursor: pointer;
	}
	@media ${device.sm} {
		padding: 1rem;
	}
`;
function BlogItemCard({ blog }: any) {
	return (
		<Wrapper>
			<Link
				aria-label={"A link to see my blog post: " + blog.title}
				href={`/blog/${blog.slug.current}`}
			>
				<Content>
					<header>
						<h2>{blog.title}</h2>
						<time dateTime={blog.publishedAt}>{new Date(blog.publishedAt).toDateString()}</time>
						{
							// show series if there it's in a series
							blog.series && (
								<p className="series">
									{blog.series}: Entry {blog.entry}
								</p>
							)
						}
					</header>
					<p>{blog.description}</p>
					<footer>
						<p className="read-more" aria-hidden="true">
							Read more &#8594;
						</p>
					</footer>
				</Content>
			</Link>
		</Wrapper>
	);
}

export default BlogItemCard;
