import Col from '../../components/Col';
import Heading from '../../components/Heading';
import Image from 'next/image'
import Layout from '../../components/Layout'
import Link from 'next/link'
import Row from '../../components/Row';

import {getAllAlbumSlugs,getSingleAlbumData} from "../../lib/api"

//waterfall
//1. getStaticPaths
export async function getStaticPaths() {
    const paths = await getAllAlbumSlugs();
    return{
        paths,
        fallback: false
    }
} 

//2. get static props
export async function getStaticProps({params}){
    const albumData = await getSingleAlbumData(params.id);
    return{
        props:{
            albumData
        }
    }
}

//3. use the data
const SingleAlbumPage = ({albumData}) => {
    const {title, featuredImage, albumInformation} = albumData;
    const { sourceUrl, altText, mediaDetails} = featuredImage.node;
    const {year, songsToAlbums, artistsToAlbums} = albumInformation;
    return <Layout>
        <Image 
        src = {sourceUrl}
        alt = {altText}
        width = {mediaDetails.width}
        height = {mediaDetails.height}

        />
        <Heading level = "1">{title}</Heading>
        <Heading level = "2">{year}</Heading>
        {artistsToAlbums && artistsToAlbums.map((artist,index)=>{
            const { title, slug } = artist;
            return <Heading level = "2">
                <Link href={`/artists/${slug}`}>
                <a>
                    {title}
                </a>
                </Link>
            </Heading>
        })}
       { songsToAlbums && 
        <section>
            <Row>
            <Heading level = "2">Songs</Heading>
            {songsToAlbums.map((song,index)=>{
                const {title} = song;

                return <Col key={index} xs = "12" sm ="12">
                    <Heading level = "3">{title}</Heading>
                </Col>

            })}
            </Row>
        </section>
}
    </Layout>
}
export default SingleAlbumPage;