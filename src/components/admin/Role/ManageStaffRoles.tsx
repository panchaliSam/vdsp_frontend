import { useEffect, useState } from "react";
import { getAllStaffRoles, updateStaffRole } from "@app_api/StaffRole.API";
import { getAllRoles } from "@app_api/Role.API";
import type { StaffRoleDto } from "@app_interfaces/StaffRole/StaffRoleDto";
import type { RoleDto } from "@app_interfaces/Role/RoleDto";
import {
    Container,
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
    Typography,
    CircularProgress,
    TextField,
    InputAdornment,
    IconButton,
    Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

const StaffRoleAssign: React.FC = () => {
    const [staffRoles, setStaffRoles] = useState<StaffRoleDto[]>([]);
    const [allRoles, setAllRoles] = useState<RoleDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [rolesData, staffRoleData] = await Promise.all([
                    getAllRoles(),
                    getAllStaffRoles(),
                ]);
                setAllRoles(rolesData);
                setStaffRoles(staffRoleData);
            } catch (err) {
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleRoleChange = async (id: number, roleName: string) => {
        try {
            const updated = await updateStaffRole(id, "ASSIGNED", roleName);
            setStaffRoles((prev) =>
                prev.map((item) => (item.id === id ? updated : item))
            );
        } catch (err) {
            console.error("Failed to assign role", err);
        }
    };

    const filteredStaff = staffRoles.filter(
        (staff) =>
            staff.staff.firstName.toLowerCase().includes(search.toLowerCase()) ||
            staff.staff.lastName.toLowerCase().includes(search.toLowerCase()) ||
            staff.staff.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container sx={{ mt: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <TextField
                    placeholder="Search staff..."
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
                <IconButton>
                    <FilterListIcon />
                </IconButton>
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
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredStaff.map((staff) => (
                                <TableRow key={staff.id}>
                                    <TableCell>{staff.id}</TableCell>
                                    <TableCell>{staff.staff.firstName}</TableCell>
                                    <TableCell>{staff.staff.lastName}</TableCell>
                                    <TableCell>{staff.staff.email}</TableCell>
                                    <TableCell>{staff.staff.phoneNumber}</TableCell>
                                    <TableCell>
                                        <Select
                                            size="small"
                                            value={staff.roleName || ""}
                                            onChange={(e) => handleRoleChange(staff.id, e.target.value)}
                                            displayEmpty
                                            fullWidth
                                        >
                                            <MenuItem disabled value="">
                                                Assign Role
                                            </MenuItem>
                                            {allRoles.map((role) => (
                                                <MenuItem key={role.roleId} value={role.roleName}>
                                                    {role.roleName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={staff.assignStatus}
                                            color={
                                                staff.assignStatus === "ASSIGNED"
                                                    ? "success"
                                                    : "warning"
                                            }
                                            size="small"
                                        />
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

export default StaffRoleAssign;
