import styles from "../styles/Input.module.css"
import {useState} from "react";
export default function Input() {
    const [input, setInput] = useState("");
    return (
        <>
            <input className={styles.input} value={input} onChange={(e) => setInput(e.target.value)}/>
        </>
    )
}