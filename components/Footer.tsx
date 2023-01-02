import styles from '../styles/Main.module.css';
import {useTranslation} from "next-i18next";

export default function Footer() {
    const { t } = useTranslation('common')
    
    return (
        <>
            <p className={styles.love}>{t('footer.madeWith')}&nbsp;
                <a
                    className={styles.link}
                    href="https://github.com/litolax/"
                    rel="noreferrer">{t('footer.author')}
                </a>
            </p>
        </>
    )
}