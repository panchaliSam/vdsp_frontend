import React, { useEffect, useState, useMemo } from 'react';
import {
    Box,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Typography,
    CircularProgress,
    Paper,
    Divider,
    TextField,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { getMyNotifications } from '@app_api/Notification.API';
import type { NotificationDto } from '@app_interfaces/Notification/NotificationDto';

const MyNotifications: React.FC = () => {
    const [notifications, setNotifications] = useState<NotificationDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterDate, setFilterDate] = useState<Date | null>(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const result = await getMyNotifications();
                if (result) {
                    setNotifications(result);
                }
            } catch (err: any) {
                console.error('Failed to fetch notifications:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchNotifications();
    }, []);

    const filtered = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        return notifications.filter(({ title, message, createdAt }) => {
            const textMatch =
                title.toLowerCase().includes(term) ||
                message.toLowerCase().includes(term);
            if (!textMatch) return false;

            if (filterDate) {
                const notifDate = new Date(createdAt);
                return (
                    notifDate.getFullYear() === filterDate.getFullYear() &&
                    notifDate.getMonth() === filterDate.getMonth() &&
                    notifDate.getDate() === filterDate.getDate()
                );
            }
            return true;
        });
    }, [notifications, searchTerm, filterDate]);

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="200px"
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box p={2}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Filter by date"
                        value={filterDate}
                        onChange={(newDate) => setFilterDate(newDate)}
                        slotProps={{ textField: { fullWidth: true } }}
                    />
                </LocalizationProvider>
            </Box>

            {filtered.length === 0 ? (
                <Typography variant="body1">You have no notifications.</Typography>
            ) : (
                <Paper elevation={1}>
                    <List>
                        {filtered.map((notification, idx) => (
                            <React.Fragment key={notification.id}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar>
                                            <NotificationsIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography variant="subtitle1" fontWeight="medium">
                                                {notification.title}
                                            </Typography>
                                        }
                                        secondary={
                                            <>
                                                <Typography variant="body2" color="text.primary">
                                                    {notification.message}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {new Date(notification.createdAt).toLocaleString()}
                                                </Typography>
                                            </>
                                        }
                                    />
                                </ListItem>
                                {idx < filtered.length - 1 && <Divider component="li" />}
                            </React.Fragment>
                        ))}
                    </List>
                </Paper>
            )}
        </Box>
    );
};

export default MyNotifications;