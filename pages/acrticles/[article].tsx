import React from 'react';
import {IArticle, IArticleFields} from "../../contentful";
import Head from "next/head";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {GetStaticPaths, GetStaticProps} from "next";
import client from "../../contentful/index";
import Link from "next/link";

const Article = ({article}: {article: IArticle}) => {
    return (
        <>
            <Head>
                <title>{article.fields.title}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={"container m-auto px-4 mb-10"}>
                <div
                    className="rounded-xl w-full h-64 shadow-sm bg-cover"
                    style={{backgroundImage:`url("https:${article.fields.image?.fields.file.url}")`}}
                ></div>
                <h1 className="text-center text-gray-700 my-12 font-bold text-4xl px-20">{article.fields.title}</h1>
                <div className="px-20">{documentToReactComponents(article.fields.content)}</div>
                <Link href={`/`}>
                    <button className="block m-auto my-10 pb-1 text-base font-black text-blue-600 uppercase border-b border-transparent hover:border-blue-600">
                        Back
                    </button>
                </Link>
            </div>
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const articles = await client.getEntries<IArticleFields>({
        content_type: 'article',
        select: "fields.slug"
    })

    return {
        paths: articles.items.map(item => {
            return {
                params: {
                    article: item.fields.slug
                }
            }
        }),
        fallback: false
    }
};

export const getStaticProps: GetStaticProps = async ({params}) => {
    const slug = params!.article;

    const articlesEntries = await client.getEntries<IArticleFields>({
        content_type: 'article',
        limit: 1,
        "fields.slug" : slug,
    });

    const [article] = articlesEntries.items;

    return {
        props: {
            article,
        }
    }
}

export default Article;