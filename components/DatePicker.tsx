import TextField from '@mui/material/TextField';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import dayjs, {Dayjs} from 'dayjs';
import React from 'react';
import AlarmIcon from '@mui/icons-material/Alarm';
import SnoozeIcon from '@mui/icons-material/Snooze';
import ClockIcon from '@mui/icons-material/AccessTime';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function DatePicker(props: { onAccept: Function }) {
    
    const [dateWithNoInitialValue, setDateWithNoInitialValue] =
        React.useState<Dayjs | null>(null);
    // const [dateWithInitialValue, setDateWithInitialValue] =
    //     React.useState<Dayjs | null>(dayjs('2023-01-01T00:00'));
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                ampm={false}
                label="Publication date"
                value={dateWithNoInitialValue}
                onChange={(newValue) => {
                    setDateWithNoInitialValue(newValue);
                }}
                components={{
                    LeftArrowIcon: AlarmIcon,
                    RightArrowIcon: SnoozeIcon,
                    OpenPickerIcon: ClockIcon,
                }}
                disablePast={true}
                renderInput={(params) => (
                    <TextField {...params}/>
                )}
                onAccept={(e) => props.onAccept(e)}
            />
            </LocalizationProvider>
        </>
    )
}