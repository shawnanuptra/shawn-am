import { device } from "@/utilities/deviceSize";
import Image from "next/image";
import Link from "next/link";
import type { Image as ImgSrc } from "sanity";
import styled from "styled-components";
import { urlForImage } from "../../sanity/lib/image";
import { Project } from "../../sanity/types";
const Wrapper = styled.div`
    aspect-ratio: 1/1;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;

    width: 100%;
    height: 100%;

    min-height: 200px;
    border-radius: 0.4rem;
    background-color: white;

    border: 1px solid #202020;
    border-width: 0.2rem;

    padding: 1rem;
    margin: 0 0 4rem 0;

    transition: all 0.1s ease-out;

    place-self: center;

    &:hover {
        /* transform: translateX(3px) translateY(-5px); */
        cursor: pointer;
        background-color: #202020;
        color: #fafafa;
    }

    .image-wrapper {
        position: relative;
        width: 100%;
        height: auto;
    }

    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 1rem 0;
        p {
            margin: 0;
        }
    }
    .separator {
        content: "";
        height: 0.3rem;
        background-color: #202020;
        border-radius: 99px;
        height: 100%;
    }

    @media ${device.sm} {
        padding: 1rem;

        .content {
            p {
                font-size: 1rem;
            }
        }
    }
`;

interface PropInterface {
    project: Project;
}

const AllProjectItemCard = ({ project }: PropInterface) => {
    //todo: add more details on hover! maybe like stars or something?
    return (
        <Link
            href={`/projects/${project.slug?.current}`}
            style={{ aspectRatio: 1 / 1 }}
        >
            <Wrapper>
                <div className='image-wrapper'>
                    <Image
                        // loader={({ width, quality = 100 }) =>
                        //     urlForImage(project?.thumbnail as ImgSrc)
                        // }
                        src={urlForImage(project?.thumbnail as ImgSrc)}
                        alt={("thumbnail of " + project.title) as string}
                        fill={true}
                        sizes={`${device.sm} 90vw, 40vw`}
                        style={{ objectFit: "contain" }}
                    />
                </div>
                <div className='content'>
                    <p>{project.title}</p>
                </div>
            </Wrapper>
        </Link>
    );
};

export default AllProjectItemCard;
