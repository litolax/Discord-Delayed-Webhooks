import styles from '../styles/Header.module.css';
import PrimaryButton from "./PrimaryButton";
import {signOut} from "next-auth/react";
import {useTranslation} from "next-i18next";

export default function Header(props: { home?: boolean }) {
    const {t} = useTranslation('common')

    return (
        <>
            <div className={styles.header}>
                <h1 className={styles.title}>{t('title')}</h1>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '16vw',
                }}>
                    {props.home == undefined && <PrimaryButton className={styles.headerSignOutButton}
                                                               href={'/main'}>{t('header.home')!}</PrimaryButton>}
                    <PrimaryButton className={styles.headerSignOutButton}
                                   onClick={() => signOut()}>{t('header.signOut')!}</PrimaryButton>
                </div>
            </div>
        </>
    )
}