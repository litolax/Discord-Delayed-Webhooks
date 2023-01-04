import TextField from '@mui/material/TextField';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {Dayjs} from 'dayjs';
import React, {useState} from 'react';
import AlarmIcon from '@mui/icons-material/Alarm';
import SnoozeIcon from '@mui/icons-material/Snooze';
import ClockIcon from '@mui/icons-material/AccessTime';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {useTranslation} from "next-i18next";

export default function DatePicker(props: { onAccept: Function }) {
    const {t} = useTranslation('posts')
    const [dateWithNoInitialValue, setDateWithNoInitialValue] = useState<Dayjs | null>(null);

    return (
        <div style={{
            marginBottom: '25px',
        }}>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    ampm={false}
                    label={`${t('publishDate')}`}
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
            {/*<br/>*/}
            {/*<br/>*/}
        </div>
    )
}