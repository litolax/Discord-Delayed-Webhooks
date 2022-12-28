
import Alert, {AlertColor} from '@mui/material/Alert';
import {Collapse} from "@mui/material";

export default function MessageAlert(props: { children?: string, className?: any, style?: any, checked: boolean, type: AlertColor }) {
    return (
        <>
            <Collapse
                in={props.checked}
                style={{transformOrigin: '0 0 0'}}
                {...(props.checked ? {timeout: 500} : {})}
            >
                <Alert 
                    variant="outlined" 
                    severity={props.type}
                    sx={{ width: 500, mb: 3.5}}>
                    {props.children}
                </Alert>
            </Collapse>
        </>
    )
}