import { useEffect, useState } from "react";
import {
    getAllRoles,
    createRole,
    updateRole,
} from "@app_api/Role.API";
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
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

const RoleComponent: React.FC = () => {
    const [roles, setRoles] = useState<RoleDto[]>([]);
    const [filteredRoles, setFilteredRoles] = useState<RoleDto[]>([]);
    const [search, setSearch] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRole, setSelectedRole] = useState<RoleDto | null>(null);
    const [newRoleName, setNewRoleName] = useState("");

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const data = await getAllRoles();
                setRoles(data);
                setFilteredRoles(data);
            } catch (err) {
                console.error("Failed to fetch roles", err);
            }
        };
        fetchRoles();
    }, []);

    useEffect(() => {
        setFilteredRoles(
            roles.filter((role) =>
                role.roleName.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, roles]);

    const handleOpenDialog = (role?: RoleDto) => {
        setSelectedRole(role ?? null);
        setNewRoleName(role?.roleName ?? "");
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setNewRoleName("");
        setSelectedRole(null);
    };

    const handleSave = async () => {
        try {
            if (selectedRole) {
                const updated = await updateRole(selectedRole.roleId!, {
                    ...selectedRole,
                    roleName: newRoleName,
                });
                setRoles((prev) =>
                    prev.map((r) => (r.roleId === updated.roleId ? updated : r))
                );
            } else {
                const created = await createRole({ roleName: newRoleName });
                setRoles((prev) => [...prev, created]);
            }
            handleDialogClose();
        } catch (err) {
            console.error("Failed to save role", err);
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <div className="flex justify-between items-center mb-4">
                <TextField
                    variant="outlined"
                    placeholder="Search roles..."
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
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog()}
                >
                    Create Role
                </Button>
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Role Name</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRoles.map((role) => (
                            <TableRow key={role.roleId}>
                                <TableCell>{role.roleId}</TableCell>
                                <TableCell>{role.roleName}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpenDialog(role)}>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="sm">
                <DialogTitle>{selectedRole ? "Edit Role" : "Create Role"}</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Role Name"
                        margin="normal"
                        value={newRoleName}
                        onChange={(e) => setNewRoleName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleSave} disabled={!newRoleName.trim()}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default RoleComponent;
