import { useEffect, useState } from "react";
import {
    getAllUsers,
    updateUser,
} from "@app_api/User.API";
import type { UserDto, Role } from "@app_interfaces/User/UserDto";
import {
    Container,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    Box,
    Menu,
    Tooltip,
    InputAdornment,
    Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";

const PeopleComponent: React.FC = () => {
    const [users, setUsers] = useState<UserDto[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedRole, setSelectedRole] = useState<Role | "ALL">("ALL");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getAllUsers();
                setUsers(data);
                setFilteredUsers(data);
            } catch (err) {
                setError("Failed to fetch users.");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleEditClick = (user: UserDto) => {
        setSelectedUser(user);
        setOpenEdit(true);
    };

    const handleDialogClose = () => {
        setOpenEdit(false);
        setSelectedUser(null);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (selectedUser) {
            setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
        }
    };

    const handleSaveChanges = async () => {
        if (selectedUser && selectedUser.id) {
            try {
                await updateUser(selectedUser.id, selectedUser);
                const updatedList = users.map((u) =>
                    u.id === selectedUser.id ? selectedUser : u
                );
                setUsers(updatedList);
                applyFilters(updatedList, selectedRole, searchQuery);
                handleDialogClose();
            } catch (error) {
                console.error("Failed to update user:", error);
            }
        }
    };

    const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleRoleSelect = (role: Role | "ALL") => {
        setSelectedRole(role);
        applyFilters(users, role, searchQuery);
        setAnchorEl(null);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
        applyFilters(users, selectedRole, query);
    };

    const applyFilters = (
        source: UserDto[],
        role: Role | "ALL",
        query: string
    ) => {
        let result = source;

        if (role !== "ALL") {
            result = result.filter((u) => u.role === role);
        }

        if (query.trim() !== "") {
            const lowerQuery = query.toLowerCase();
            result = result.filter(
                (u) =>
                    u.firstName.toLowerCase().includes(lowerQuery) ||
                    u.lastName.toLowerCase().includes(lowerQuery) ||
                    u.email.toLowerCase().includes(lowerQuery)
            );
        }

        setFilteredUsers(result);
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <TextField
                    placeholder="Search by name or email"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    size="small"
                    sx={{ width: 300 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                <Tooltip title="Filter by Role">
                    <IconButton onClick={handleFilterClick}>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                >
                    <MenuItem onClick={() => handleRoleSelect("ALL")}>All Roles</MenuItem>
                    <MenuItem onClick={() => handleRoleSelect("ROLE_CUSTOMER")}>Customer</MenuItem>
                    <MenuItem onClick={() => handleRoleSelect("ROLE_ADMIN")}>Admin</MenuItem>
                    <MenuItem onClick={() => handleRoleSelect("ROLE_STAFF")}>Staff</MenuItem>
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
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phoneNumber}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEditClick(user)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Edit Modal */}
            <Dialog open={openEdit} onClose={handleDialogClose} maxWidth="sm" fullWidth>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    {selectedUser && (
                        <>
                            <TextField
                                fullWidth
                                label="First Name"
                                name="firstName"
                                value={selectedUser.firstName}
                                onChange={handleInputChange}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                value={selectedUser.lastName}
                                onChange={handleInputChange}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={selectedUser.email}
                                onChange={handleInputChange}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Phone Number"
                                name="phoneNumber"
                                value={selectedUser.phoneNumber}
                                onChange={handleInputChange}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Role"
                                name="role"
                                select
                                value={selectedUser.role}
                                onChange={handleInputChange}
                                margin="normal"
                            >
                                <MenuItem value="ROLE_CUSTOMER">Customer</MenuItem>
                                <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
                                <MenuItem value="ROLE_STAFF">Staff</MenuItem>
                            </TextField>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={handleSaveChanges} variant="contained">
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default PeopleComponent;