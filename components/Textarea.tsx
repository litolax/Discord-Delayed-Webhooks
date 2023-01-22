import TextField from '@mui/material/TextField';

export default function Textarea(props: {
	children: string;
	value: string;
	onChange: Function;
	style?: any;
	minRows?: number;
	maxRows?: number;
	label: string;
}) {
	return (
		<>
			<TextField
				id='outlined-multiline-static'
				label={props.label}
				multiline
				minRows={props.minRows ?? 4}
				maxRows={props.maxRows ?? 17}
				defaultValue=''
				onChange={e => props.onChange(e.target.value)}
				style={{
					marginBottom: '25px',
					...props.style
				}}
			/>
		</>
	);
}