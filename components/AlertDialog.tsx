import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props: { content: { title: string, desc: string }, stateInfo: { state: boolean, stateFunc: Function}, agree?: Function, disagree?: Function }) {
    const handleClose = () => {
        props.stateInfo.stateFunc(false)
        props.disagree && props.disagree();
    };

    const handleAgree = () => {
        props.agree && props.agree();
    }

    return (
        <div>
            <Dialog
                open={props.stateInfo.state}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle 
                    id="alert-dialog-title"
                    style={{
                        background: 'rgb(19, 48, 79)'
                    }}>
                    {props.content.title}
                </DialogTitle>
                <DialogContent
                    style={{
                        background: 'rgb(19, 48, 79)'
                    }}>
                    <DialogContentText id="alert-dialog-description">
                        {props.content.desc}
                    </DialogContentText>
                </DialogContent>
                <DialogActions
                    style={{
                        background: 'rgb(19, 48, 79)'
                    }}>
                    <Button onClick={handleClose}>
                        Disagree
                    </Button>
                    <Button onClick={handleAgree} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}