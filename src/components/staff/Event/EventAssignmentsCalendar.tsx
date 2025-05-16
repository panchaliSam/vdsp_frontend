import { useEffect, useState } from "react";
import { getMyAssignedEvents } from "@app_api/EventStaff.API";
import type { EventStaffDto } from "@app_interfaces/EventStaff/EventStaffDto";
import {
    Box,
    CircularProgress,
    Container,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import type { View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const MyEventAssignmentsCalendar: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState<"month" | "week" | "day">("month");

    useEffect(() => {
        const fetchAssignedEvents = async () => {
            try {
                const data: EventStaffDto[] = await getMyAssignedEvents();
                console.log("Assigned events:", data);

                const calendarEvents = data.map((item) => {
                    const res = item.eventDto?.reservationDetails;
                    const date = item.eventDto?.eventDate;

                    console.log("Event date:", date); // should now show 2025-10-16
                    console.log("Event start time:", res?.eventStartTime); // should now show 08:00:00

                    const start = moment(`${date}T${res?.eventStartTime}`).toDate();
                    const end = moment(`${date}T${res?.eventEndTime}`).toDate();

                    return {
                        id: item.id,
                        title: `${res?.eventType} - ${res?.customerName}`,
                        start,
                        end,
                        details: res,
                    };
                });

                setEvents(calendarEvents);
            } catch (err) {
                setError("Failed to fetch assigned events");
            } finally {
                setLoading(false);
            }
        };

        fetchAssignedEvents();
    }, []);

    const handleViewChange = (view: View) => {
        if (["month", "week", "day"].includes(view)) {
            setCurrentView(view as "month" | "week" | "day");
        }
    };

    const handleSelectEvent = (event: any) => {
        setSelectedEvent(event);
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h5" color="white" gutterBottom>
                My Assigned Events
            </Typography>

            {loading ? (
                <CircularProgress color="info" />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <Box height={600} sx={{ bgcolor: "#111", borderRadius: 2 }}>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        views={["month", "week", "day"]}
                        view={currentView}
                        date={currentDate}
                        onView={handleViewChange}
                        onNavigate={(date) => setCurrentDate(date)}
                        onSelectEvent={handleSelectEvent}
                        style={{ height: "100%", color: "white", padding: "10px" }}
                        eventPropGetter={() => ({
                            style: {
                                backgroundColor: "#1976d2",
                                color: "white",
                                borderRadius: "5px",
                                padding: "4px",
                            },
                        })}
                        dayPropGetter={(date) => {
                            const isDayActive = events.some((ev) =>
                                moment(date).isSame(ev.start, "day")
                            );
                            return {
                                style: {
                                    backgroundColor: isDayActive ? "#222" : "#000",
                                    color: "white",
                                    border: "1px solid #333",
                                },
                            };
                        }}
                    />
                </Box>
            )}

            <Dialog open={!!selectedEvent} onClose={() => setSelectedEvent(null)} maxWidth="sm" fullWidth>
                <DialogTitle>Event Details</DialogTitle>
                <DialogContent>
                    {selectedEvent?.details && (
                        <List>
                            <ListItem>
                                <ListItemText primary="Customer Name" secondary={selectedEvent.details.customerName} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Event Type" secondary={selectedEvent.details.eventType} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Location" secondary={selectedEvent.details.eventLocation} />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Time"
                                    secondary={`${selectedEvent.details.eventStartTime} - ${selectedEvent.details.eventEndTime}`}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Package"
                                    secondary={`${selectedEvent.details.packageName} (${selectedEvent.details.priceAmount} LKR)`}
                                />
                            </ListItem>
                        </List>
                    )}
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default MyEventAssignmentsCalendar;