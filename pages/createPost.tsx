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
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from "@mui/material/Accordion";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export default function MainLayout() {
    const { t } = useTranslation('posts')
    
    const [contentArea, setContentArea] = useState('');
    const [webhookArea, setWebhookArea] = useState('');
    const [previewWebhookArea, setPreviewWebhookArea] = useState('');
    const [pickerDate, setPickerDate] = useState(undefined);
    const [alertContent, setAlertContent] = useState({error: 'error', type: "success"});
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
            error: t(`${responseJson.error}`),
            type: t(`${responseJson.error}`) != `${t('created')}` ? 'error' : 'success'
        });
        return responseJson;
    }

    return (
        <>
            <Head>
                <title>{t('common:title')}</title>
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
                            label={`${t('content')}`}
                            value={contentArea}
                            onChange={setContentArea}
                            style={{
                                height: '300px'
                            }}>
                            Input message text here</Textarea>

                        <DatePicker onAccept={setPickerDate}></DatePicker>

                        <Textarea
                            label={`${t('webhook')}`}
                            value={webhookArea}
                            onChange={setWebhookArea}
                            style={{
                                height: '300px'
                            }}
                            minRows={1}>
                            Input message text here</Textarea>
                    </div>

                    <Accordion
                        style={{
                            background: 'rgb(19, 48, 79)',
                            marginBottom: '45px'
                        }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{t('preview.title')}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography noWrap={false}>
                                {t('preview.description')}
                            </Typography>

                            <Textarea
                                label={`${t('preview.webhook')}`}
                                value={previewWebhookArea}
                                onChange={setPreviewWebhookArea}
                                minRows={1}
                                style={{
                                    width: '1000px',
                                }}>
                                Input message text here
                            </Textarea>


                            <PrimaryButton
                                onClick={() => {
                                }}
                                style={{
                                    width: '300px',
                                    marginTop: '15px',
                                    marginBottom: '15px'
                                }}>
                                {t('preview.send')!}
                            </PrimaryButton>

                        </AccordionDetails>
                    </Accordion>


                    <PrimaryButton
                        onClick={() => savePost(contentArea)}
                        style={{
                            marginBottom: '25px',
                            width: '200px'
                        }}
                        alert={{
                            content: alertContent.error ?? '',
                            type: alertContent.type as AlertColor
                        }}>
                        {t('add')!}
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
        props: {
            ...(await serverSideTranslations(ctx.locale || 'ru', ['common', 'posts'])),
        }
    };
}