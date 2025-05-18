import React, { useEffect, useState } from "react";
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
    Box,
    TextField,
    Chip,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

const EventStaffAssign: React.FC = () => {
    const [eventStaffList, setEventStaffList] = useState<EventStaffDto[]>([]);
    const [staffList, setStaffList] = useState<StaffDto[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStaffNames, setSelectedStaffNames] = useState<Record<number, string[]>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [eventStaff, staff] = await Promise.all([
                    getAllEventStaff(),
                    getAllStaff(),
                ]);
                const esList = eventStaff ?? [];
                setEventStaffList(esList);
                setStaffList(staff ?? []);
                console.log("Fetched staffList:", staff);

                const initialSelection: Record<number, string[]> = {};
                esList.forEach(es => {
                    initialSelection[es.id] = es.staff
                        ? [`${es.staff.firstName} ${es.staff.lastName}`]
                        : [];
                });
                setSelectedStaffNames(initialSelection);
            } catch (err) {
                setError("Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleStaffChange = async (eventStaffId: number, names: string[]) => {
        // Optimistically update UI
        setSelectedStaffNames(prev => ({ ...prev, [eventStaffId]: names }));
        try {
            const success = await assignMultipleStaffByName(eventStaffId, names);
            if (!success) {
                console.error("Assignment failed on server.");
            }
        } catch (err) {
            console.error("Failed to assign multiple staff:", err);
        }
    };

    const filteredList = eventStaffList.filter(es => {
        const query = searchQuery.toLowerCase();
        const names = selectedStaffNames[es.id] ?? [];
        const staffString = names.join(", ").toLowerCase();
        const dateString = es.eventDate?.toLowerCase() ?? "";
        return staffString.includes(query) || dateString.includes(query);
    });

    return (
        <Container sx={{ mt: 4 }}>
            <Box mb={2} display="flex" justifyContent="space-between">
                <TextField
                    placeholder="Search by staff name or event date"
                    size="small"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
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
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredList.map(es => {
                                const names = selectedStaffNames[es.id] ?? [];
                                const assigned = names.length > 0;
                                return (
                                    <TableRow key={es.id}>
                                        <TableCell>{es.id}</TableCell>
                                        <TableCell>{es.eventDate}</TableCell>
                                        <TableCell sx={{ minWidth: 200 }}>
                                            <Autocomplete
                                                multiple
                                                options={staffList.map(
                                                    s => `${s.firstName} ${s.lastName}`
                                                )}
                                                value={names}
                                                onChange={(
                                                    _event: React.SyntheticEvent<Element, Event>,
                                                    value: string[]
                                                ) => handleStaffChange(es.id, value)}
                                                filterSelectedOptions
                                                renderTags={(value, getTagProps) =>
                                                    value.map((option, idx) => (
                                                        <Chip
                                                            {...getTagProps({ index: idx })}
                                                            key={option}
                                                            label={option}
                                                            size="small"
                                                        />
                                                    ))
                                                }
                                                renderInput={params => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        placeholder="Select Staff"
                                                        size="small"
                                                    />
                                                )}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={
                                                    assigned
                                                        ? `${names.length} assigned`
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
