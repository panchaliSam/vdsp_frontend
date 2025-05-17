import { useEffect, useState } from "react";
import {
    getAllEventStaff,
    assignStaffByName,
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const EventStaffAssign: React.FC = () => {
    const [eventStaffList, setEventStaffList] = useState<EventStaffDto[]>([]);
    const [staffList, setStaffList] = useState<StaffDto[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [eventStaff, staff] = await Promise.all([
                    getAllEventStaff(),
                    getAllStaff(),
                ]);
                setEventStaffList(eventStaff);
                setStaffList(staff);
            } catch (err) {
                setError("Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleAssign = async (eventStaffId: number, staffName: string) => {
        try {
            const updated = await assignStaffByName(eventStaffId, staffName);
            setEventStaffList((prev) =>
                prev.map((es) => (es.id === updated.id ? updated : es))
            );
        } catch (err) {
            console.error("Failed to assign staff:", err);
        }
    };

    const filteredList = eventStaffList.filter((es) => {
        const query = searchQuery.toLowerCase();
        const staffName = es.staff
            ? `${es.staff.firstName} ${es.staff.lastName}`.toLowerCase()
            : "";
        const eventDate = es.eventDate?.toString().toLowerCase();
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
                                <TableCell>Assigned Staff</TableCell>
                                <TableCell>Assignment Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredList.map((es) => {
                                const assigned =
                                    es.staff &&
                                    es.staff.firstName &&
                                    es.staff.lastName &&
                                    es.assignedAt;

                                const staffValue = es.staff
                                    ? `${es.staff.firstName} ${es.staff.lastName}`
                                    : "";

                                return (
                                    <TableRow key={es.id}>
                                        <TableCell>{es.id}</TableCell>
                                        <TableCell>{es.eventDate}</TableCell>
                                        <TableCell>
                                            <Select
                                                size="small"
                                                value={staffValue}
                                                onChange={(e) =>
                                                    handleAssign(es.id, e.target.value as string)
                                                }
                                                displayEmpty
                                                fullWidth
                                            >
                                                <MenuItem disabled value="">
                                                    Select Staff
                                                </MenuItem>
                                                {staffList.map((staff) => (
                                                    <MenuItem
                                                        key={staff.id}
                                                        value={`${staff.firstName} ${staff.lastName}`}
                                                    >
                                                        {staff.firstName} {staff.lastName}
                                                    </MenuItem>
                                                ))}
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