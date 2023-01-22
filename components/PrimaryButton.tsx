import { Button } from '@mui/material';
import MessageAlert from './MessageAlert';
import { useState } from 'react';
import { AlertColor } from '@mui/material/Alert';

export default function PrimaryButton(props: {
	onClick?: Function;
	children?: string;
	className?: any;
	href?: string;
	style?: any;
	alert?: { content: string; type: AlertColor };
}) {
	const [postAlert, setPostAlert] = useState(false);
	return (
		<>
			<Button
				onClick={() => {
					props.onClick && props.onClick();
					props.alert && setPostAlert(true);
					setTimeout(() => props.alert && setPostAlert(false), 2500);
				}}
				variant='contained'
				className={props.className}
				style={{
					fontFamily: 'Greycliff CF',
					fontSize: '15px',
					fontWeight: '700',
					...props.style
				}}
				href={props.href}
			>
				{props.children}
			</Button>
			<MessageAlert checked={postAlert} type={props.alert?.type ?? 'info'}>
				{props.alert?.content}
			</MessageAlert>
		</>
	);
}
