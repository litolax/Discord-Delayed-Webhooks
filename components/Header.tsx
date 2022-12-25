import styles from '../styles/Header.module.css';
import PrimaryButton from "./PrimaryButton";
import {signOut} from "next-auth/react";

export default function Header(props: {home?: boolean}) {
    return (
        <>
            <div className={styles.header}>
                <h1 className={styles.title}>Discord delayed messages manager</h1>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '16vw',
                }}>
                    {props.home == undefined && <PrimaryButton className={styles.headerSignOutButton} href={'/main'}>Home</PrimaryButton>}
                    <PrimaryButton className={styles.headerSignOutButton} onClick={() => signOut()}>Sign Out</PrimaryButton>
                </div>
            </div>
        </>
    )
}