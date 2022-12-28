import IPost from "../src/models/IPost";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {ReactNode, SyntheticEvent, useState} from "react";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
// import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';


export default function Post(props: IPost) {
    interface TabPanelProps {
        children?: ReactNode;
        index: number;
        value: number;
    }

    function TabPanel(props: TabPanelProps) {
        const {children, value, index, ...other} = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{p: 3}}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const creationDate = new Date(props.creationDate!).toLocaleString().toString();
    const publishDate = new Date(props.publishDate!).toLocaleString().toString();

    return (
        <>
            <div style={{
                marginBottom: '35px',
                fontFamily: 'Greycliff CF',
                fontSize: '15px',
                color: 'rgb(199, 209, 219)',
            }}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Content" {...a11yProps(0)} />
                        <Tab label="Sender" {...a11yProps(1)} />
                        <Tab label="Creation date" {...a11yProps(2)} />
                        <Tab label="Publish date" {...a11yProps(3)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    {props.content}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {props.sender}
                </TabPanel>
                <TabPanel value={value} index={2}>
                    {creationDate}
                </TabPanel>
                <TabPanel value={value} index={3}>
                    {publishDate}
                </TabPanel>

                <Stack direction="row" spacing={3}>
                    <ToggleButton
                        value="check"
                        selected={true}
                        color={props.sent ? 'success' : 'error'}
                        // onChange={() => {
                        //     setSelected(!selected);
                        // }}
                    >
                        <CheckIcon />
                    </ToggleButton>
                    {/*<Button variant="outlined" endIcon={<EditIcon />}>*/}
                    {/*    Edit*/}
                    {/*</Button>*/}
                    <Button variant="outlined" startIcon={<DeleteIcon />}>
                        Delete
                    </Button>
                </Stack>
            </div>
        </>
    )
}