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
import {AlertColor} from "@mui/material/Alert";

export default function MainLayout() {
    const [contentArea, setContentArea] = useState('');
    const [webhookArea, setWebhookArea] = useState('');
    const [pickerDate, setPickerDate] = useState(undefined);
    const [alertContent, setAlertContent] = useState({error: undefined, type: "success"});
    const session = useSession();

    async function savePost(content: string) {
        const date = new Date(Date.now())

        const post: IPost = {
            _id: new ObjectId(),
            content: content,
            creationDate: date,
            publishDate: pickerDate,
            sent: false,
            sender: session.data?.user?.name ? session.data.user.name : 'unknown',
            webhook: webhookArea
        }
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(post)
        });

        if (!response.ok)
            throw new Error(response.statusText)

        const responseJson = await response.json();
        setAlertContent({
            error: responseJson.error,
            type: responseJson.error != 'Post has create successfully' ? 'error' : 'success'
        });
        return responseJson;
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
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                    }}>
                        <Textarea
                            label={'Content'}
                            value={contentArea}
                            onChange={setContentArea}
                            style={{
                                height: '300px'
                            }}>
                            Input message text here</Textarea>

                        <DatePicker onAccept={setPickerDate}></DatePicker>

                        <Textarea
                            label={'Webhook'}
                            value={webhookArea}
                            onChange={setWebhookArea}
                            style={{
                                height: '300px'
                            }}
                            minRows={1}>
                            Input message text here</Textarea>
                    </div>

                    <PrimaryButton
                        onClick={() => savePost(contentArea)}
                        style={{
                            marginBottom: '25px',
                            width: '150px'
                        }}
                        alert={{
                            content: alertContent.error ?? '',
                            type: alertContent.type as AlertColor
                        }}>
                        Add post
                    </PrimaryButton>

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