import {Button} from "@mui/material";

export default function PrimaryButton(props: { onClick?: Function, children?: string, className?: any, href?: string, style?: any }) {
    return (
        <>
            <Button 
                onClick = {() => props.onClick && props.onClick()} 
                variant="contained" 
                className={props.className} 
                style={{
                fontFamily: 'Greycliff CF',
                fontSize: '15px',
                fontWeight: '700',
                // color: 'rgb(199, 209, 219)',
                    ...props.style
            }} href={props.href}
            >{props.children}</Button>
        </>
    )
}