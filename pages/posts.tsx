import Head from "next/head";
import mainStyles from '../styles/Main.module.css'
import {GetServerSideProps} from "next";
import {authRedirect} from "../src/server/authRedirect";
import Header from "../components/Header";
import Footer from "../components/Footer";
import IPost from "../src/models/IPost";
import Post from "../components/Post";
import {connectToDatabase} from "../src/server/database";

export default function MainLayout(props: {data: IPost[]}) {
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
                    <div style={{marginBottom: '35px', display: 'flex', flexDirection: 'column'}}>
                        {props.data.map((e) => (
                            <Post {...e} key={e._id.toString()}/>
                        ))}
                    </div>
                    
                    <Footer/>
                </div>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { db } = await connectToDatabase();
    const collection = await db
        .collection('posts');
    
    const data = await collection.find().toArray() as IPost[];
    
    return {
        redirect: await authRedirect(ctx),
        props: { data }
    };
}