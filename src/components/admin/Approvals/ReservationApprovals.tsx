import { useEffect, useState } from "react";
import {
    getAllReservationApprovals,
    updateApprovalStatus,
} from "@app_api/ReservationStatusApproval";
import type { ReservationApprovalDto } from "@app_interfaces/Reservation/RservationApprovalDto";
import {
    Container,
    CircularProgress,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
    Chip,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Box,
    IconButton,
    TextField,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

const AdminReservationApprovals: React.FC = () => {
    const [approvals, setApprovals] = useState<ReservationApprovalDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filterEventType, setFilterEventType] = useState<string>("");
    const [filterSession, setFilterSession] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        const fetchApprovals = async () => {
            try {
                const data = await getAllReservationApprovals();
                setApprovals(data);
            } catch (err) {
                setError("Failed to fetch reservation approvals.");
            } finally {
                setLoading(false);
            }
        };
        fetchApprovals();
    }, []);

    const handleStatusChange = async (id: number, newStatus: string) => {
        const target = approvals.find((a) => a.id === id);
        if (!target || target.status === "APPROVED") return;
        try {
            const updated = await updateApprovalStatus(id, newStatus);
            setApprovals((prev) =>
                prev.map((item) => (item.id === id ? updated : item))
            );
        } catch (err) {
            console.error("Failed to update status", err);
        }
    };

    const filteredApprovals = approvals.filter((approval) => {
        return (
            (filterEventType ? approval.eventType === filterEventType : true) &&
            (filterSession ? approval.sessionType === filterSession : true) &&
            (searchTerm
                ? approval.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                approval.eventLocation.toLowerCase().includes(searchTerm.toLowerCase())
                : true)
        );
    });

    return (
        <Container sx={{ mt: 4 }}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
                gap={2}
                flexWrap="wrap"
            >
                <TextField
                    placeholder="Search by customer or location"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ flex: 1, minWidth: 200 }}
                />
                <Box display="flex" gap={2}>
                    <FormControl size="small">
                        <InputLabel>Event Type</InputLabel>
                        <Select
                            value={filterEventType}
                            onChange={(e) => setFilterEventType(e.target.value)}
                            label="Event Type"
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="WEDDING">Wedding</MenuItem>
                            <MenuItem value="BIRTHDAY">Birthday</MenuItem>
                            <MenuItem value="GRADUATION">Graduation</MenuItem>
                            <MenuItem value="CORPORATE">Corporate</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl size="small">
                        <InputLabel>Session</InputLabel>
                        <Select
                            value={filterSession}
                            onChange={(e) => setFilterSession(e.target.value)}
                            label="Session"
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="MORNING_SESSION">Morning</MenuItem>
                            <MenuItem value="EVENING_SESSION">Evening</MenuItem>
                            <MenuItem value="FULLDAY_SESSION">Fullday</MenuItem>
                        </Select>
                    </FormControl>
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Box>
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
                                <TableCell>Event</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Session</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredApprovals.map((approval) => (
                                <TableRow key={approval.id}>
                                    <TableCell>{approval.id}</TableCell>
                                    <TableCell>{approval.customerName}</TableCell>
                                    <TableCell>{approval.eventType}</TableCell>
                                    <TableCell>{new Date(approval.eventDate).toDateString()}</TableCell>
                                    <TableCell>{approval.eventLocation}</TableCell>
                                    <TableCell>
                                        {approval.sessionType.replace("_SESSION", "")}
                                    </TableCell>
                                    <TableCell>
                                        {approval.status === "APPROVED" ? (
                                            <Chip label={approval.status} color="success" />
                                        ) : (
                                            <Select
                                                size="small"
                                                value={approval.status}
                                                onChange={(e) =>
                                                    handleStatusChange(approval.id, e.target.value)
                                                }
                                            >
                                                <MenuItem value="PENDING">Pending</MenuItem>
                                                <MenuItem value="DISAPPROVED">Disapproved</MenuItem>
                                                <MenuItem value="APPROVED">Approved</MenuItem>
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

export default AdminReservationApprovals;