import Head from "next/head";
import mainStyles from '../styles/Main.module.css'
import {GetServerSideProps} from "next";
import {authRedirect} from "../src/server/authRedirect";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import Footer from "../components/Footer";
import Textarea from "../components/Textarea";
import IPost from "../src/models/IPost";
import {ObjectId} from "bson";
import DatePicker from "../components/DatePicker";
import {useState} from "react";
import {useSession} from "next-auth/react";

export default function MainLayout() {
    const [contentArea, setContentArea] = useState('');
    const [pickerDate, setPickerDate] = useState(new Date());
    const session = useSession();

    async function savePost(content: string) {
        const date = new Date(Date.now())

        const post: IPost = {
            _id: new ObjectId(),
            content: content,
            creationDate: date,
            publishDate: pickerDate,
            sent: false,
            sender: session.data?.user?.name ? session.data.user.name : 'unknown'
        }
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(post)
        });

        if (!response.ok)
            throw new Error(response.statusText)

        return await response.json();
    }

    return (
        <>
            <Head>
                <title>Discord delayed messages manager</title>
                <meta name="description" content="Create post page"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={mainStyles.App}>
                <div className={mainStyles.container}>
                    <Header/>

                    <div style={{
                        marginBottom: '35px',
                        display: 'flex', 
                        flexDirection: 'column'
                    }}>
                        <Textarea 
                            value={contentArea} 
                            onChange={setContentArea}
                            style={{
                                height: '300px',
                                marginBottom: '35px' }}>
                            Input message text here</Textarea>
                        <DatePicker onAccept={setPickerDate}/>
                    </div>

                    <PrimaryButton onClick={() => savePost(contentArea)} style={{marginBottom: '35px'}}>Add post</PrimaryButton>

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