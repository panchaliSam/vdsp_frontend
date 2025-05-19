import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Snackbar,
    Alert,
    InputAdornment,
    Divider,
    Tooltip,
} from "@mui/material";
import { DatePicker, LocalizationProvider, PickersDay } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import EventIcon from "@mui/icons-material/Event";

import { addHoliday } from "@app_api/Holiday.API";
import { getCalendarDates } from "@app_api/Calendar.API";
import type { HolidayDto } from "@app_interfaces/Calendar/HolidayDto";
import type { CalendarDatesResponse } from "@app_interfaces/Calendar/CalendarDatesResponse";

const AddHoliday: React.FC = () => {
    const [name, setName] = useState("");
    const [date, setDate] = useState<Date | null>(new Date());
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [calendarData, setCalendarData] = useState<CalendarDatesResponse | null>(null);

    useEffect(() => {
        const fetchCalendar = async () => {
            const data = await getCalendarDates();
            if (data) setCalendarData(data);
        };
        fetchCalendar();
    }, []);

    // Freeze if: holiday, any approved session, or pending session exists
    const isDateInvalidForHoliday = (d: Date | null): boolean => {
        if (!d) return true;
        const f = format(d, "yyyy-MM-dd");
        const isHoliday = calendarData?.holidays.some(h => h.date === f);
        const isApproved = calendarData?.approvedEventDatesWithSessionType.some(e => e.eventDate === f);
        const isPending = calendarData?.pendingEventDatesWithSessionType.some(e => e.eventDate === f);
        return !!isHoliday || !!isApproved || !!isPending;
    };

    const getTooltip = (d: Date): string => {
        const f = format(d, "yyyy-MM-dd");
        const holiday = calendarData?.holidays.find(h => h.date === f);
        const approved = calendarData?.approvedEventDatesWithSessionType.filter(e => e.eventDate === f) || [];
        const pending = calendarData?.pendingEventDatesWithSessionType.filter(e => e.eventDate === f) || [];

        if (holiday) return `Holiday: ${holiday.name}`;
        if (approved.length)
            return `Approved: ${approved.map(e => e.sessionType.toLowerCase().replace("_", " ")).join(", ")}`;
        if (pending.length) return "Pending reservation – may not approve";
        return "";
    };

    const handleSubmit = async () => {
        if (!name || !date || isDateInvalidForHoliday(date)) {
            setError(true);
            return;
        }

        const dto: HolidayDto = {
            name: name.trim(),
            date: date.toISOString().split("T")[0],
        };

        const result = await addHoliday(dto);
        if (result) {
            setSuccess(true);
            setName("");
            setDate(new Date());
        } else {
            setError(true);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Paper
                elevation={8}
                sx={{
                    p: 4,
                    maxWidth: 500,
                    mx: "auto",
                    mt: 6,
                    borderRadius: 3,
                    backgroundColor: "#121212",
                    color: "#ffffff",
                }}
            >
                <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
                    Add New Holiday
                </Typography>

                <Divider sx={{ mb: 3, borderColor: "#333" }} />

                <Box display="flex" flexDirection="column" gap={3}>
                    <TextField
                        label="Holiday Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        placeholder="e.g. Independence Day"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EventIcon sx={{ color: "#aaa" }} />
                                </InputAdornment>
                            ),
                        }}
                        InputLabelProps={{ style: { color: "#ccc" } }}
                        sx={{
                            "& .MuiInputBase-root": {
                                color: "#fff",
                                backgroundColor: "#1e1e1e",
                            },
                        }}
                    />

                    <DatePicker
                        label="Holiday Date"
                        value={date}
                        onChange={(newDate) => setDate(newDate)}
                        shouldDisableDate={isDateInvalidForHoliday}
                        slots={{
                            day: (props) => {
                                const f = format(props.day, "yyyy-MM-dd");
                                const approved = calendarData?.approvedEventDatesWithSessionType.filter(e => e.eventDate === f) || [];
                                const pending = calendarData?.pendingEventDatesWithSessionType.filter(e => e.eventDate === f) || [];
                                const holiday = calendarData?.holidays.find(h => h.date === f);
                                const disabled = isDateInvalidForHoliday(props.day);

                                return (
                                    <Tooltip title={getTooltip(props.day)}>
                                        <span>
                                            <PickersDay
                                                {...props}
                                                disabled={disabled}
                                                sx={{
                                                    position: "relative",
                                                    "&::before": approved.some(s => s.sessionType === 'MORNING_SESSION') ? {
                                                        content: '""',
                                                        position: "absolute",
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        bottom: "50%",
                                                        backgroundColor: "#FFBF00",
                                                        opacity: 0.5,
                                                        zIndex: 1,
                                                    } : undefined,
                                                    "&::after": approved.some(s => s.sessionType === 'EVENING_SESSION') ? {
                                                        content: '""',
                                                        position: "absolute",
                                                        top: "50%",
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        backgroundColor: "#FFBF00",
                                                        opacity: 0.5,
                                                        zIndex: 1,
                                                    } : undefined,
                                                    backgroundColor: pending.length ? "#008000" : undefined,
                                                    background: holiday ? "#FF1744" : undefined,
                                                    color: holiday ? "#fff" : undefined,
                                                    borderRadius: "8px",
                                                }}
                                            />
                                        </span>
                                    </Tooltip>
                                );
                            },
                        }}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                required: true,
                                helperText: date && isDateInvalidForHoliday(date)
                                    ? "You cannot add a holiday on this date"
                                    : "Select a valid holiday date",
                                error: date ? isDateInvalidForHoliday(date) : false,
                                InputLabelProps: { style: { color: "#ccc" } },
                                sx: {
                                    input: { color: "white" },
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor: "#1e1e1e",
                                        color: "#fff",
                                        "& fieldset": { borderColor: "white" },
                                        "&:hover fieldset": { borderColor: "white" },
                                        "&.Mui-focused fieldset": { borderColor: "white" },
                                    },
                                },
                            },
                        }}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={!name || !date || isDateInvalidForHoliday(date)}
                        sx={{
                            textTransform: "none",
                            fontWeight: "bold",
                            py: 1.5,
                            borderRadius: 2,
                            backgroundColor: "#2979ff",
                            ":hover": {
                                backgroundColor: "#1565c0",
                            },
                        }}
                    >
                        Add Holiday
                    </Button>
                </Box>

                <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
                    <Alert severity="success" onClose={() => setSuccess(false)}>
                        Holiday added successfully!
                    </Alert>
                </Snackbar>

                <Snackbar open={error} autoHideDuration={3000} onClose={() => setError(false)}>
                    <Alert severity="error" onClose={() => setError(false)}>
                        Please check your input and avoid selecting frozen dates.
                    </Alert>
                </Snackbar>
            </Paper>
        </LocalizationProvider>
    );
};

export default AddHoliday;