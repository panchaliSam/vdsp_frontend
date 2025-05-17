import { useEffect, useState } from "react";
import {
    getAllEvents,
    updateAlbumStatus,
} from "@app_api/Event.API";
import type { EventDto, AlbumStatus } from "@app_interfaces/Event/EventDto";
import type { EventType } from "@app_interfaces/Reservation/ReservationDto";
import {
    Box,
    Chip,
    CircularProgress,
    Container,
    IconButton,
    InputAdornment,
    Menu,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";

const EventAlbumStatus: React.FC = () => {
    const [events, setEvents] = useState<EventDto[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<EventDto[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState<EventType | "ALL">("ALL");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllEvents();
                setEvents(data);
                setFilteredEvents(data);
            } catch (err) {
                setError("Failed to fetch events");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        applyFilters(events, selectedType, query);
    };

    const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleTypeSelect = (type: EventType | "ALL") => {
        setSelectedType(type);
        applyFilters(events, type, searchQuery);
        setAnchorEl(null);
    };

    const applyFilters = (
        source: EventDto[],
        type: EventType | "ALL",
        query: string
    ) => {
        let result = source;

        if (type !== "ALL") {
            result = result.filter((e) => e.reservationDetails.eventType === type);
        }

        if (query.trim() !== "") {
            const lower = query.toLowerCase();
            result = result.filter(
                (e) =>
                    e.reservationDetails.customerName?.toLowerCase().includes(lower) ||
                    e.reservationDetails.eventLocation?.toLowerCase().includes(lower)
            );
        }

        setFilteredEvents(result);
    };

    const handleAlbumStatusChange = async (id: number, newStatus: AlbumStatus) => {
        try {
            const updated = await updateAlbumStatus(id, newStatus);
            setEvents((prev) => prev.map((e) => (e.id === id ? updated : e)));
            applyFilters(
                events.map((e) => (e.id === id ? updated : e)),
                selectedType,
                searchQuery
            );
        } catch (err) {
            console.error("Failed to update album status", err);
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <TextField
                    placeholder="Search by customer or location"
                    size="small"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                <Tooltip title="Filter by Event Type">
                    <IconButton onClick={handleFilterClick}>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>

                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                    <MenuItem onClick={() => handleTypeSelect("ALL")}>All Event Types</MenuItem>
                    <MenuItem onClick={() => handleTypeSelect("WEDDING")}>Wedding</MenuItem>
                    <MenuItem onClick={() => handleTypeSelect("BIRTHDAY")}>Birthday</MenuItem>
                    <MenuItem onClick={() => handleTypeSelect("GRADUATION")}>Graduation</MenuItem>
                    <MenuItem onClick={() => handleTypeSelect("CORPORATE")}>Corporate</MenuItem>
                </Menu>
            </Box>

            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Customer</TableCell>
                                <TableCell>Event Type</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredEvents.map((event) => (
                                <TableRow key={event.id}>
                                    <TableCell>{event.id}</TableCell>
                                    <TableCell>{event.reservationDetails.customerName}</TableCell>
                                    <TableCell>{event.reservationDetails.eventType}</TableCell>
                                    <TableCell>{event.reservationDetails.eventDate}</TableCell>
                                    <TableCell>{event.reservationDetails.eventLocation}</TableCell>
                                    <TableCell>
                                        {event.albumStatus === "COMPLETED" ? (
                                            <Chip label="Completed" color="success" size="small" />
                                        ) : (
                                            <Select
                                                size="small"
                                                value={event.albumStatus}
                                                onChange={(e) =>
                                                    handleAlbumStatusChange(event.id, e.target.value as AlbumStatus)
                                                }
                                            >
                                                <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                                                <MenuItem value="COMPLETED">Completed</MenuItem>
                                            </Select>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

export default EventAlbumStatus;