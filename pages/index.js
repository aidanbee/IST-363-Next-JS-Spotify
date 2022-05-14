import Head from 'next/head'


//custom components

import Layout from '../components/Layout'
import NewReleases from '../components/NewReleases'
import Showcase from '../components/Showcase'


import {getAlbums} from '../lib/api'

export async function getStaticProps() {
  const albums = await getAlbums()
  return {
    props: {
        albums
    }
  }
}

export default function Home({albums}) {
  return (
    <Layout>
        <Head>
            <title>IST 363 Spotify</title>
            <link rel="icon" href="/favicon.ico" />
            <meta name="description" content="This a description of my website for search engine results"/>
        </Head>
        <Showcase />
        <NewReleases items={albums}/>

        {/*<TracksByGenre items={tracks}/>*/}

    </Layout>
  )
}
