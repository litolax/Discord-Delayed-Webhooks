import styles from "../../styles/Input.module.css"
import {useState} from "react";
export default function Input(props: any) {
    console.log(props)
    const [input, setInput] = useState("");
    return (
        <>
            <div className={styles.container}>
                <p>{props.textBefore}</p>
                <input className={styles.input} value={input} onChange={(e) => setInput(e.target.value)}/>
                <button onClick={() => props.onClick({text: input})}>Нажми меня</button>
            </div>
        </>
    )
}