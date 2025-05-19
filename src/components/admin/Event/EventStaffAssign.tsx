import React, { useEffect, useMemo, useState } from "react";
import {
    getAllEventStaff,
    assignMultipleStaffByName,
    unassignStaff,
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

interface DateGroup {
    date: string;
    baseSlotId: number;
    slots: EventStaffDto[];
}

const EventStaffAssign: React.FC = () => {
    const [slots, setSlots] = useState<EventStaffDto[]>([]);
    const [staffList, setStaffList] = useState<StaffDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    // 1) load everything
    useEffect(() => {
        (async () => {
            try {
                const [allSlots, allStaff] = await Promise.all([
                    getAllEventStaff(),
                    getAllStaff(),
                ]);
                setSlots(allSlots);
                setStaffList(allStaff ?? []);
            } catch {
                setError("Unable to load data");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // 2) group by date
    const groups: DateGroup[] = useMemo(() => {
        const map: Record<string, DateGroup> = {};
        for (const s of slots) {
            if (!map[s.eventDate]) {
                map[s.eventDate] = {
                    date: s.eventDate,
                    baseSlotId: s.id,
                    slots: [],
                };
            }
            map[s.eventDate].slots.push(s);
        }
        return Object.values(map).sort((a, b) =>
            a.date.localeCompare(b.date)
        );
    }, [slots]);

    // 3) handle additions / removals
    const handleChange = async (
        group: DateGroup,
        newNames: string[]
    ) => {
        const oldNames = group.slots
            .filter((s) => s.staff)
            .map(
                (s) =>
                    `${s.staff!.firstName} ${s.staff!.lastName}`
            );

        const toAdd = newNames.filter((n) => !oldNames.includes(n));
        const toRemove = oldNames.filter((n) => !newNames.includes(n));

        // 3a) remove first, one by one
        for (const name of toRemove) {
            const slot = group.slots.find(
                (s) =>
                    s.staff &&
                    `${s.staff.firstName} ${s.staff.lastName}` === name
            );
            if (slot) {
                await unassignStaff(slot.id);
            }
        }

        // 3b) add all at once on the baseSlot
        if (toAdd.length) {
            await assignMultipleStaffByName(
                group.baseSlotId,
                toAdd
            );
        }

        // 3c) re-load
        const refreshed = await getAllEventStaff();
        setSlots(refreshed);
    };

    if (loading)
        return (
            <Box textAlign="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container sx={{ mt: 4 }}>
            <Box mb={2} display="flex">
                <TextField
                    placeholder="Search by staff or date"
                    size="small"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Staff</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {groups
                            .filter((g) =>
                                g.date.includes(search.toLowerCase()) ||
                                g.slots
                                    .map((s) =>
                                        s.staff
                                            ? `${s.staff.firstName} ${s.staff.lastName}`
                                            : ""
                                    )
                                    .join(", ")
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                            )
                            .map((g) => {
                                const assignedNames = g.slots
                                    .filter((s) => s.staff)
                                    .map(
                                        (s) =>
                                            `${s.staff!.firstName} ${s.staff!.lastName}`
                                    );
                                return (
                                    <TableRow key={g.date}>
                                        <TableCell>{g.date}</TableCell>
                                        <TableCell sx={{ minWidth: 240 }}>
                                            <Autocomplete
                                                multiple
                                                options={staffList.map(
                                                    (s) =>
                                                        `${s.firstName} ${s.lastName}`
                                                )}
                                                value={assignedNames}
                                                onChange={(_, v) =>
                                                    handleChange(g, v)
                                                }
                                                filterSelectedOptions
                                                renderTags={(value, getTagProps) =>
                                                    value.map((opt, i) => (
                                                        <Chip
                                                            {...getTagProps({ index: i })}
                                                            key={opt}
                                                            label={opt}
                                                            size="small"
                                                        />
                                                    ))
                                                }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder="Select staff"
                                                        size="small"
                                                    />
                                                )}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={
                                                    assignedNames.length > 0
                                                        ? `${assignedNames.length} assigned`
                                                        : "none"
                                                }
                                                color={
                                                    assignedNames.length > 0
                                                        ? "success"
                                                        : "warning"
                                                }
                                                size="small"
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default EventStaffAssign;