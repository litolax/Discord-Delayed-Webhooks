import Head from "next/head";
import styles from "../styles/Main.module.css";
import {useState} from "react";
import {GetServerSideProps} from "next";
import {authRedirect} from "../src/server/authRedirect";
import PrimaryButton from "./PrimaryButton";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout() {
    return (
        <>
            <Head>
                <title>Discord delayed messages manager</title>
                <meta name="description" content="Main page"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.App}>
                <div className={styles.container}>
                    <Header home={false}/>
                    
                    <nav className={styles.navigation}>
                        <PrimaryButton href={'/createPost'}>Create new post</PrimaryButton>
                        <PrimaryButton href={'/posts'}>View posts</PrimaryButton>
                    </nav>

                    <Footer/>
                </div>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        redirect: await authRedirect(ctx),
        props: {}
    };
}