import Head from "next/head";
import mainStyles from '../styles/Main.module.css'
import {GetServerSideProps} from "next";
import {authRedirect} from "../src/server/authRedirect";
import Header from "../components/Header";
import Footer from "../components/Footer";
import IPost from "../src/models/IPost";
import Post from "../components/Post";
import {connectToDatabase} from "../src/server/database";
import {ObjectID} from "bson";
import {useEffect, useState} from "react";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";

export default function MainLayout(props: { data: IPost[] }) {
    const { t } = useTranslation('posts')
    const [posts, setPosts] = useState(props.data);

    useEffect(() => {
        setPosts(props.data)
    }, [props.data])

    const deletePost = async (postId: ObjectID) => {
        const response = await fetch(`/api/deletePost/${postId}`);

        if (!response.ok)
            throw new Error(response.statusText);
        
        setPosts((prevState) => prevState.filter(v => v._id !== postId))
    }

    props.data.sort((a, b) => {
        const aDate = new Date(a.creationDate);
        const bDate = new Date(b.creationDate);
        return bDate.getTime() - aDate.getTime()
    })

    return (
        <>
            <Head>
                <title>Discord delayed messages manager</title>
                <meta name="description" content="View post page"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={mainStyles.App}>
                <div className={mainStyles.container}>
                    <Header/>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {posts.length > 0 ? posts.map((e) => (
                            <Post post={e} key={e._id.toString()} onDelete={deletePost}/>
                        )) : <p className={mainStyles.text} style={{marginBottom: '25px'}}>{t('nothing')}</p>}
                    </div>

                    <Footer/>
                </div>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const {db} = await connectToDatabase();
    const collection = await db
        .collection('posts');

    const data = await collection.find().toArray() as IPost[];

    return {
        redirect: await authRedirect(ctx),
        props: {
            data,
            ...(await serverSideTranslations(ctx.locale || 'ru', ['common', 'posts'])),
        }
    };
}