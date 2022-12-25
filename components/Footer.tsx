import styles from '../styles/Main.module.css';

export default function Footer() {
    return (
        <>
            <p className={styles.love}>Made with ❤️ by&nbsp;
                <a
                    className={styles.link}
                    href="https://github.com/litolax/"
                    rel="noreferrer">litolax
                </a>
            </p>
        </>
    )
}