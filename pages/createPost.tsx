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
import axios from "axios";
import {Checkbox, FormControlLabel} from "@mui/material";
import {matchIsValidColor, MuiColorInput} from "mui-color-input";
import {Utils} from "../src/Utils";
import IEmbed from "../src/models/IEmbed";

export default function MainLayout() {
    const {t} = useTranslation('posts')

    const [contentArea, setContentArea] = useState('');
    const [webhookArea, setWebhookArea] = useState('');
    const [previewWebhookArea, setPreviewWebhookArea] = useState('');
    const [pickerDate, setPickerDate] = useState(undefined);
    const [alertContent, setAlertContent] = useState({error: 'error', type: "success"});
    const [customWebhookInfoState, setCustomWebhookInfoState] = useState(false);
    const [embedBuilder, setEmbedBuilder] = useState(false);
    const [username, setUsername] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [embedAuthorName, setEmbedAuthorName] = useState('');
    const [embedAuthorAvatarUrl, setEmbedAuthorAvatarUrl] = useState('');
    const [embedTitle, setEmbedTitle] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [embedDescription, setEmbedDescription] = useState('');
    const [embedMainImage, setEmbedMainImage] = useState('');
    const [embedFooterText, setEmbedFooterText] = useState('');
    const [embedFooterUrl, setEmbedFooterUrl] = useState('');
    const [embedColor, setEmbedColor] = useState('#ffffff')
    const session = useSession();

    const handleEmbedColorChange = (color: any) => {
        if (!matchIsValidColor(color)) return;
        setEmbedColor(color);
    }

    async function savePost(content: string) {
        const date = new Date(Date.now())

        const embed: IEmbed =
            {
                _id: new ObjectId(),
                title: `${embedTitle}`,
                color: Utils.hexToDecimal(embedColor),
                description: `${embedDescription}`,
                thumbnail: `${thumbnailUrl}`,
                footer: {
                    text: `${embedFooterText}`,
                    icon_url: `${embedFooterUrl}`
                },
                author: {
                    name: `${embedAuthorName}`,
                    icon_url: `${embedAuthorAvatarUrl}`
                },
                image: {
                    url: `${embedMainImage}`
                }
                //todo fields
            }

        const post: IPost = {
            _id: new ObjectId(),
            content: content,
            creationDate: date,
            publishDate: pickerDate,
            sent: false,
            sender: session.data?.user?.name ? session.data.user.name : 'unknown',
            webhook: webhookArea,
            username: username,
            avatarUrl: avatarUrl,
            embeds: embedBuilder ? [embed] : []
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

    async function sendPreviewPost(content: string) {
        console.log(Utils.hexToDecimal(embedColor))
        const embed: IEmbed =
            {
                _id: new ObjectId(),
                title: `${embedTitle}`,
                color: Utils.hexToDecimal(embedColor),
                description: `${embedDescription}`,
                thumbnail: `${thumbnailUrl}`,
                footer: {
                    text: `${embedFooterText}`,
                    icon_url: `${embedFooterUrl}`
                },
                author: {
                    name: `${embedAuthorName}`,
                    icon_url: `${embedAuthorAvatarUrl}`
                },
                image: {
                    url: `${embedMainImage}`
                }
                //todo fields
            }


        let data = JSON.stringify({
            'content': content,
            'username': `${username}`,
            'avatar_url': `${avatarUrl}`,
            'embeds': embedBuilder ? [embed] : []
        })

        const config = {
            method: "POST",
            url: previewWebhookArea,
            headers: {"Content-Type": "application/json"},
            data: data,
        };

        axios(config)
            .then((response) => {
                console.log("Webhook delivered successfully");
                return response;
            })
            .catch((error) => {
                console.log(error);
                return error;
            });
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
                    }}>
                        <Textarea
                            label={`${t('content')}`}
                            value={contentArea}
                            onChange={setContentArea}>
                            Input message text here</Textarea>

                        <DatePicker onAccept={setPickerDate}></DatePicker>

                        <Textarea
                            label={`${t('webhook')}`}
                            value={webhookArea}
                            onChange={setWebhookArea}
                            minRows={1}>!</Textarea>

                        <FormControlLabel className={mainStyles.text} style={{
                            marginBottom: '25px'
                        }} control={
                            <Checkbox
                                defaultChecked={false}
                                onClick={() => setCustomWebhookInfoState(!customWebhookInfoState)}/>}
                                          label={`${t('customWebhookInfoNeeded')}`}/>

                        {customWebhookInfoState && (
                            <>
                                <div>
                                    <Textarea
                                        label={`${t('username')}`}
                                        value={username}
                                        onChange={setUsername}
                                        minRows={1}>!</Textarea>
                                </div>

                                <Textarea
                                    label={`${t('avatarUrl')}`}
                                    value={avatarUrl}
                                    onChange={setAvatarUrl}
                                    minRows={1}>!</Textarea>
                            </>
                        )}

                        <FormControlLabel className={mainStyles.text} style={{
                            marginBottom: '25px'
                        }} control={
                            <Checkbox
                                defaultChecked={false}
                                onClick={() => setEmbedBuilder(!embedBuilder)}/>}
                                          label={`${t('embed.builderName')}`}/>

                        {embedBuilder && (
                            <Accordion
                                style={{
                                    background: 'rgb(19, 48, 79)',
                                    marginBottom: '25px'
                                }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>{t('embed.builderName')}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <Textarea
                                            label={`${t('embed.author.name')}`}
                                            value={embedAuthorName}
                                            onChange={setEmbedAuthorName}
                                            minRows={1}>!</Textarea>

                                        <Textarea
                                            label={`${t('embed.author.avatarUrl')}`}
                                            value={embedAuthorAvatarUrl}
                                            onChange={setEmbedAuthorAvatarUrl}
                                            minRows={1}>!</Textarea>

                                        <Textarea
                                            label={`${t('embed.title')}`}
                                            value={embedTitle}
                                            onChange={setEmbedTitle}
                                            minRows={1}>!</Textarea>

                                        <Textarea
                                            label={`${t('embed.thumbnailUrl')}`}
                                            value={thumbnailUrl}
                                            onChange={setThumbnailUrl}
                                            minRows={1}>!</Textarea>

                                        <Textarea
                                            label={`${t('embed.description')}`}
                                            value={embedDescription}
                                            onChange={setEmbedDescription}
                                            minRows={1}>!</Textarea>

                                        <Textarea
                                            label={`${t('embed.mainImage')}`}
                                            value={embedMainImage}
                                            onChange={setEmbedMainImage}
                                            minRows={1}>!</Textarea>

                                        <Textarea
                                            label={`${t('embed.footer.text')}`}
                                            value={embedFooterText}
                                            onChange={setEmbedFooterText}
                                            minRows={1}>!</Textarea>

                                        <Textarea
                                            label={`${t('embed.footer.url')}`}
                                            value={embedFooterUrl}
                                            onChange={setEmbedFooterUrl}
                                            minRows={1}>!</Textarea>

                                        <MuiColorInput
                                            value={embedColor}
                                            onChange={handleEmbedColorChange}
                                            format="hex"/>

                                        {/*<br/>*/}
                                        {/*<br/>*/}
                                        {/*<br/>*/}
                                        {/*<br/>*/}
                                        {/*<br/>*/}
                                        {/*<Textarea*/}
                                        {/*    label={`${t('embed.fieldsCount')}`}*/}
                                        {/*    value={avatarUrl}*/}
                                        {/*    onChange={setAvatarUrl}*/}
                                        {/*    minRows={1}>!</Textarea>*/}
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        )}

                    </div>

                    <Accordion
                        style={{
                            background: 'rgb(19, 48, 79)',
                            marginBottom: '25px'
                        }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{t('preview.title')}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography noWrap={false} style={{
                                marginBottom: '25px'
                            }}>
                                {t('preview.description')}
                            </Typography>

                            <Textarea
                                label={`${t('preview.webhook')}`}
                                value={previewWebhookArea}
                                onChange={setPreviewWebhookArea}
                                minRows={1}
                                style={{
                                    width: '100%',
                                }}>
                                Input message text here
                            </Textarea>

                            <PrimaryButton
                                onClick={() => sendPreviewPost(contentArea)}
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