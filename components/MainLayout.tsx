import Head from "next/head";
import styles from "../styles/Main.module.css";
import {GetServerSideProps} from "next";
import {authRedirect} from "../src/server/authRedirect";
import PrimaryButton from "./PrimaryButton";
import Header from "./Header";
import Footer from "./Footer";
import {useTranslation} from "next-i18next";

export default function MainLayout() {
    const { t } = useTranslation('common')
    return (
        <>
            <Head>
                <title>{t('title')}</title>
                <meta name="description" content="Main page"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.App}>
                <div className={styles.container}>
                    <Header home={false}/>
                    
                    <nav className={styles.navigation}>
                        <PrimaryButton href={'/createPost'}>{t('main.newPost')!}</PrimaryButton>
                        <PrimaryButton href={'/posts'}>{t('main.viewPosts')!}</PrimaryButton>
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