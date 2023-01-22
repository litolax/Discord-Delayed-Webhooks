import IPost from '../src/models/IPost';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
// import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AlertDialog from './AlertDialog';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

export default function Post(props: { post: IPost; onDelete?: Function }) {
	const { t } = useTranslation('posts');
	const creationDate = new Date(props.post.creationDate!)
		.toLocaleString()
		.toString();
	const publishDate = new Date(props.post.publishDate!)
		.toLocaleString()
		.toString();

	const [deleteAlertState, setDeleteAlertState] = useState(false);

	return (
		<>
			<div
				style={{
					marginBottom: '35px',
					fontFamily: 'Greycliff CF',
					fontSize: '15px',
					color: 'rgb(199, 209, 219)'
				}}
			>
				<Accordion
					TransitionProps={{ unmountOnExit: true }}
					style={{
						background: 'rgb(19, 48, 79)'
					}}
				>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls='panel1a-content'
						id='panel1a-header'
					>
						<Typography>{props.post.content.slice(0, 50)}...</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography
							noWrap={false}
							style={{ whiteSpace: 'pre-line', width: '100%' }}
						>
							{`${t('content')}:\n${
								!props.post.content ? '-' : props.post.content
							}\n
                                ${t('sender')}: ${props.post.sender}\n
                                ${t('creationDate')}: ${creationDate}\n
                                ${t('publishDate')}: ${publishDate}\n
                                ${t('webhook')}: ${props.post.webhook}\n
                                ${t('username')}: ${
								!props.post.username ? '-' : props.post.username
							}\n
                                ${t('avatarUrl')}: ${
								!props.post.avatarUrl ? '-' : props.post.avatarUrl
							}\n
                                ${t('embed.builderName')}: ${
                                    props.post.embeds &&
                                    props.post.embeds.length > 0
									? `${t('embed.exists.yes')}`
									: `${t('embed.exists.no')}`
							}`}
						</Typography>
						<Stack
							direction='row'
							spacing={3}
							sx={{ marginTop: '25px', marginBottom: '15px' }}
						>
							<ToggleButton
								value='check'
								selected={true}
								color={props.post.sent ? 'success' : 'error'}
							>
								<CheckIcon />
							</ToggleButton>
							{/*<Button variant="outlined" endIcon={<EditIcon />}>*/}
							{/*    Edit*/}
							{/*</Button>*/}
							<Button
								variant='outlined'
								startIcon={<DeleteIcon />}
								onClick={() => setDeleteAlertState(true)}
							>
								{t('common:delete')}
							</Button>
							<AlertDialog
								content={{
									title: `${t('common:areYouSure')}`,
									desc: `${t('tryToDeletePost')}`
								}}
								stateInfo={{
									state: deleteAlertState,
									stateFunc: setDeleteAlertState
								}}
								agree={() => props.onDelete && props.onDelete(props.post._id)}
							/>
						</Stack>
					</AccordionDetails>
				</Accordion>
			</div>
		</>
	);
}
