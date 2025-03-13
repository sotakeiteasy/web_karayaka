import { getAllPostIds, getPostData } from "../../lib/blog";
import Date from '@components/date/date'

export default function Post({ postData }) {
    return (
        <div>
            {postData.title}
            <br />
            {postData.id}
            <br />
            <Date dateString={postData.date} />
            <br />
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </div>
    )
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false
    }
}

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
export async function getStaticProps( { params, locale }) {
    // Fetch necessary data for the blog post using params.id
    const postData = await getPostData(params.id);
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            postData
        }
    }
}