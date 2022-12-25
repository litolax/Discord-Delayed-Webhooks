import Head from "next/head";
import mainStyles from '../styles/Main.module.css'
import styles from "../styles/CreatePost.module.css";
import {GetServerSideProps} from "next";
import {authRedirect} from "../src/server/authRedirect";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import Footer from "../components/Footer";
import Textarea from "../components/Textarea";
import IPost from "../src/models/IPost";
import {ObjectId} from "bson";
import DatePicker from "../components/DatePicker";
import { useState } from "react";
import {useSession} from "next-auth/react";
import Posts from "./api/posts";
import Post from "../components/Post";
import {connectToDatabase} from "../src/server/database";

export default function MainLayout(props: {data: IPost[]}) {
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
        .collection('Posts');
    
    const data = await collection.find().toArray() as IPost[];
    
    return {
        redirect: await authRedirect(ctx),
        props: { data }
    };
}