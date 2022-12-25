import styles from '../styles/Header.module.css';
import IPost from "../src/models/IPost";

export default function Post(props: IPost) {
    return (
        <>
            <div className={styles.header}>
               <p>{props._id.toString()}</p>
               <p>{props.content.toString()}</p>
               <p>{props.publishDate.toString()}</p>
               <p>{props.creationDate.toString()}</p>
               <p>{props.sent.toString()}</p>
               <p>{props.sender.toString()}</p>
            </div>
        </>
    )
}