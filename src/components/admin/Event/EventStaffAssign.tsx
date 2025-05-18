import { useEffect, useState } from "react";
import {
    getAllEventStaff,
    assignMultipleStaffByName,
} from "@app_api/EventStaff.API";
import { getAllStaff } from "@app_api/Staff.API";
import type { EventStaffDto } from "@app_interfaces/EventStaff/EventStaffDto";
import type { StaffDto } from "@app_interfaces/Staff/StaffDto";
import {
    Container,
    CircularProgress,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Select,
    MenuItem,
    Chip,
    TextField,
    Box,
    InputAdornment,
    OutlinedInput,
    Checkbox,
    ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const EventStaffAssign: React.FC = () => {
    const [eventStaffList, setEventStaffList] = useState<EventStaffDto[]>([]);
    const [staffList, setStaffList] = useState<StaffDto[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedStaffNames, setSelectedStaffNames] = useState<{
        [key: number]: string[];
    }>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [eventStaff, staff] = await Promise.all([
                    getAllEventStaff(),
                    getAllStaff(),
                ]);
                setEventStaffList(eventStaff || []);
                setStaffList(staff || []);

                // Initialize selected staff names for each event (if needed)
                const initialSelections: { [key: number]: string[] } = {};
                (eventStaff || []).forEach((es) => {
                    if (es.staff) {
                        const fullName = `${es.staff.firstName} ${es.staff.lastName}`;
                        initialSelections[es.id] = [fullName];
                    }
                });
                setSelectedStaffNames(initialSelections);
            } catch (err) {
                setError("Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleAssign = async (eventStaffId: number, staffNames: string[]) => {
        const success = await assignMultipleStaffByName(eventStaffId, staffNames);
        if (success) {
            const updated = await getAllEventStaff();
            setEventStaffList(updated || []);
        }
    };

    const handleStaffChange = (eventId: number, value: string[]) => {
        setSelectedStaffNames((prev) => ({
            ...prev,
            [eventId]: value,
        }));
        handleAssign(eventId, value);
    };

    const filteredList = eventStaffList.filter((es) => {
        const query = searchQuery.toLowerCase();
        const staffName = es.staff
            ? `${es.staff.firstName} ${es.staff.lastName}`.toLowerCase()
            : "";
        const eventDate = es.eventDate?.toLowerCase();
        return (
            staffName.includes(query) ||
            (eventDate && eventDate.includes(query))
        );
    });

    return (
        <Container sx={{ mt: 4 }}>
            <Box mb={2} display="flex" justifyContent="space-between">
                <TextField
                    placeholder="Search by staff name or event date"
                    size="small"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ width: 320 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
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
                                <TableCell>Event Date</TableCell>
                                <TableCell>Assign Staff</TableCell>
                                <TableCell>Assignment Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredList.map((es) => {
                                const assigned = es.assignedAt !== null;
                                const eventId = es.id;
                                const selected = selectedStaffNames[eventId] || [];

                                return (
                                    <TableRow key={eventId}>
                                        <TableCell>{eventId}</TableCell>
                                        <TableCell>{es.eventDate}</TableCell>
                                        <TableCell>
                                            <Select
                                                multiple
                                                size="small"
                                                value={selected}
                                                onChange={(e) =>
                                                    handleStaffChange(eventId, e.target.value as string[])
                                                }
                                                input={<OutlinedInput />}
                                                renderValue={(selected) => selected.join(", ")}
                                                fullWidth
                                            >
                                                {staffList.map((staff) => {
                                                    const fullName = `${staff.firstName} ${staff.lastName}`;
                                                    return (
                                                        <MenuItem key={staff.id} value={fullName}>
                                                            <Checkbox
                                                                checked={selected.includes(fullName)}
                                                            />
                                                            <ListItemText primary={fullName} />
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={
                                                    assigned
                                                        ? `Assigned at ${new Date(
                                                            es.assignedAt!
                                                        ).toLocaleString()}`
                                                        : "Not Assigned"
                                                }
                                                color={assigned ? "success" : "warning"}
                                                size="small"
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

export default EventStaffAssign;