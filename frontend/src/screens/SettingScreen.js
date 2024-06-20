import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';

function SettingsScreen() {
    const [preferredDays, setPreferredDays] = useState([]);
    const [preferredTimes, setPreferredTimes] = useState([]);

    const days = [
        { label: 'Mon', value: 1 },
        { label: 'Tues', value: 2 },
        { label: 'Wed', value: 3 },
        { label: 'Thurs', value: 4 },
        { label: 'Fri', value: 5 },
        { label: 'Sat', value: 6 },
        { label: 'Sun', value: 7 }
    ];

    const times = [
        { label: 'Midnight to early morning (12am - 6am)', value: 1 },
        { label: 'Morning to afternoon (6am - 12pm)', value: 2 },
        { label: 'Afternoon to evening (12pm - 7pm)', value: 3 },
        { label: 'Evening to night (7pm - 12am)', value: 4 }
    ];

    const handleDayChange = (event) => {
        const value = parseInt(event.target.value);
        setPreferredDays((prev) =>
            event.target.checked ? [...prev, value] : prev.filter((day) => day !== value)
        );
    };

    const handleTimeChange = (event) => {
        const value = parseInt(event.target.value);
        setPreferredTimes((prev) =>
            event.target.checked ? [...prev, value] : prev.filter((time) => time !== value)
        );
    };

    const handleSubmit = () => {
        const daysString = preferredDays.join(', ');
        const timesString = preferredTimes.join(', ');
        // Send the strings to the backend
        console.log('Preferred Days:', daysString);
        console.log('Preferred Times:', timesString);
        // Example API call (adjust URL and method as needed)
        fetch('/api/settings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ preferredDays: daysString, preferredTimes: timesString }),
        }).then((response) => {
            if (response.ok) {
                console.log('Settings saved successfully');
            } else {
                console.error('Error saving settings');
            }
        });
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h5" component="h1" gutterBottom>
                Settings
            </Typography>

            <Typography variant="h6" component="h2" gutterBottom>
                Preferred Days
            </Typography>
            <FormGroup>
                {days.map((day) => (
                    <FormControlLabel
                        key={day.value}
                        control={
                            <Checkbox
                                value={day.value}
                                onChange={handleDayChange}
                                checked={preferredDays.includes(day.value)}
                            />
                        }
                        label={day.label}
                    />
                ))}
            </FormGroup>

            <Typography variant="h6" component="h2" gutterBottom>
                Preferred Times
            </Typography>
            <FormGroup>
                {times.map((time) => (
                    <FormControlLabel
                        key={time.value}
                        control={
                            <Checkbox
                                value={time.value}
                                onChange={handleTimeChange}
                                checked={preferredTimes.includes(time.value)}
                            />
                        }
                        label={time.label}
                    />
                ))}
            </FormGroup>

            <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ mt: 2 }}>
                Save Settings
            </Button>
        </Box>
    );
}

export default SettingsScreen;
