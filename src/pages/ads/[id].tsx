import { getAllAds } from "@/lib/ad";
import { getAdById } from "@/lib/ad";
import Head from "next/head"

export default function AdPage({postData}) {
    return (
        <>
            <Head>
                <title>{postData.title.en}</title>
            </Head>
            <div>here will be page  </div>
        </>
    )
}

export function getStaticPaths() {
    const paths = getAllAds();
    return {
        paths,
        fallback: false
    }
}


import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import next from "next";
export async function getStaticProps({ params, locale }) {
    const postData = getAdById(params.id)
  return {
    props: {
          ...(await serverSideTranslations(locale, ['common'])),
        postData
    },
  };
}