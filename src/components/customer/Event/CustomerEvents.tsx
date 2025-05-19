import React, { useEffect, useState } from "react";
import { getMyEvents } from "@app_api/Event.API";
import type { EventDto, AlbumStatus } from "@app_interfaces/Event/EventDto";
import {
    Container,
    Typography,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Box,
    Modal,
    Button,
} from "@mui/material";
import { format } from 'date-fns';

const getStatusColor = (status: AlbumStatus) => {
    switch (status) {
        case "IN_PROGRESS":
            return "warning"; // MUI chip color
        case "COMPLETED":
            return "success";
        default:
            return "default";
    }
};

const CustomerEvents: React.FC = () => {
    const [events, setEvents] = useState<EventDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<EventDto | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getMyEvents();
                setEvents(data ?? []);
            } catch (err: any) {
                console.error(err);
                setError(err.message || "Failed to fetch events.");
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const handleViewClick = (event: EventDto) => {
        setSelectedEvent(event);
    };

    const handleCloseModal = () => {
        setSelectedEvent(null);
    };

    return (
        <Container sx={{ mt: 4, mb: 4 }}>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Reservation ID</TableCell>
                                    <TableCell>Event Date</TableCell>
                                    <TableCell>Album Status</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {events.map((evt) => (
                                    <TableRow key={evt.id}>
                                        <TableCell>{evt.id}</TableCell>
                                        <TableCell>{evt.reservationId}</TableCell>
                                        <TableCell>{format(new Date(evt.eventDate), 'yyyy-MM-dd')}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={evt.albumStatus}
                                                color={getStatusColor(evt.albumStatus)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() => handleViewClick(evt)}
                                            >
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Modal open={!!selectedEvent} onClose={handleCloseModal}>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                p: 4,
                                borderRadius: 2,
                                width: 400,
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Event Details
                            </Typography>

                            {selectedEvent && (
                                <Box>
                                    <Typography><strong>ID:</strong> {selectedEvent.id}</Typography>
                                    <Typography><strong>Reservation ID:</strong> {selectedEvent.reservationId}</Typography>
                                    <Typography><strong>Date:</strong> {format(new Date(selectedEvent.eventDate), 'yyyy-MM-dd')}</Typography>
                                    <Typography><strong>Album Status:</strong> {selectedEvent.albumStatus}</Typography>
                                    {/* Add more reservationDetails fields here if needed */}
                                </Box>
                            )}

                            <Button
                                variant="contained"
                                sx={{ mt: 2 }}
                                onClick={handleCloseModal}
                            >
                                Close
                            </Button>
                        </Box>
                    </Modal>
                </>
            )}
        </Container>
    );
};

export default CustomerEvents;
