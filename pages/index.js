import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout, { siteTitle } from "../components/Layout";
import { getPostsData } from "../lib/post";
import styles from "../styles/Home.module.css";
import utilStyle from "../styles/utils.module.css";

//for SSG
export async function getStaticProps() {
    const allPostsData = getPostsData(); //id, title, date, thumbnail

    return {
        props: {
            allPostsData,
        },
    };
}

// for SSR
// export async function getServerSideProps(context) {
//     return {
//         props: {
//             //コンポーネントに渡すためのprops
//         }
//     }
// }

export default function Home({ allPostsData }) {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section>
                <p className={utilStyle.headingMd}>ブログ鋭意作成中</p>
            </section>

            <section
                className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
                <h2>📝エンジニアのブログ</h2>
                <div className={styles.grid}>
                    {allPostsData.map(({ id, title, date, thumbnail }) => (
                        <article key={id}>
                            <Link href={`/posts/${id}`}>
                                <img
                                    src={`${thumbnail}`}
                                    className={styles.thumbnailImage}
                                    alt={title}
                                />
                            </Link>
                            <Link href={`/posts/${id}`}>
                                <a className={utilStyle.boldText}>{title}</a>
                            </Link>
                            <br />
                            <small className={utilStyle.lightText}>
                                {date}
                            </small>
                        </article>
                    ))}
                </div>
            </section>
        </Layout>
    );
}
