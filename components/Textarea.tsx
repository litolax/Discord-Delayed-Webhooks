import TextField from '@mui/material/TextField';

export default function Textarea(props: { children: string, value: string, onChange: Function, style?: any }) {
    return (
        <>
            <br/>
            <TextField
                id="outlined-multiline-static"
                label="Content"
                multiline
                minRows={4}
                maxRows={17}
                defaultValue=""
                onChange={(e) => props.onChange(e.target.value)}
            />
            <br/><br/>
        </>
    )
}