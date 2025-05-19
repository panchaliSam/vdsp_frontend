import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { getMyNotifications } from '@app_api/Notification.API';
import type { NotificationDto } from '@app_interfaces/Notification/NotificationDto';

const MyNotifications: React.FC = () => {
    const [notifications, setNotifications] = useState<NotificationDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            const result = await getMyNotifications();
            if (result) {
                setNotifications(result);
            }
            setLoading(false);
        };
        fetchNotifications();
    }, []);

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
        <Box p={2} >

            {
                notifications.length === 0 ? (
                    <Typography variant="body1" >
                        You have no notifications.
                    </Typography>
                ) : (
                    <Paper elevation={1} >
                        <List>
                            {
                                notifications.map((notification, idx) => (
                                    <React.Fragment key={notification.id} >
                                        <ListItem alignItems="flex-start" >
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <NotificationsIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            < ListItemText
                                                primary={
                                                    < Typography variant="subtitle1" fontWeight="medium" >
                                                        {notification.title}
                                                    </Typography>
                                                }
                                                secondary={
                                                    <>
                                                        <Typography variant="body2" color="text.primary" >
                                                            {notification.message}
                                                        </Typography>
                                                        < Typography variant="caption" color="text.secondary" >
                                                            {new Date(notification.createdAt).toLocaleString()}
                                                        </Typography>
                                                    </>
                                                }
                                            />
                                        </ListItem>
                                        {idx < notifications.length - 1 && <Divider component="li" />}
                                    </React.Fragment>
                                ))}
                        </List>
                    </Paper>
                )}
        </Box>
    );
};

export default MyNotifications;