import { useEffect, useState } from "react";
import {
    getAllPackages,
    createPackage,
    updatePackage,
} from "@app_api/Package.API";
import type { PackageDto } from "@app_interfaces/Package/PackageDto";
import {
    Container,
    TextField,
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
    Button,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

const PackageComponent: React.FC = () => {
    const [packages, setPackages] = useState<PackageDto[]>([]);
    const [filteredPackages, setFilteredPackages] = useState<PackageDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<PackageDto | null>(
        null
    );
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const data = await getAllPackages();
                setPackages(data);
                setFilteredPackages(data);
            } catch (err) {
                console.error("Failed to fetch packages.");
            } finally {
                setLoading(false);
            }
        };
        fetchPackages();
    }, []);

    useEffect(() => {
        const lower = searchTerm.toLowerCase();
        const filtered = packages.filter(
            (pkg) =>
                pkg.name.toLowerCase().includes(lower) ||
                pkg.description.toLowerCase().includes(lower)
        );
        setFilteredPackages(filtered);
    }, [searchTerm, packages]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (selectedPackage) {
            setSelectedPackage({
                ...selectedPackage,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleCreateClick = () => {
        setSelectedPackage({
            name: "",
            description: "",
            price: 0,
        });
        setOpenModal(true);
    };

    const handleEditClick = (pkg: PackageDto) => {
        setSelectedPackage(pkg);
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
        setSelectedPackage(null);
    };

    const handleSave = async () => {
        try {
            if (selectedPackage?.id) {
                await updatePackage(selectedPackage.id, selectedPackage);
                const updated = packages.map((p) =>
                    p.id === selectedPackage.id ? selectedPackage : p
                );
                setPackages(updated);
                setFilteredPackages(updated);
            } else {
                const created = await createPackage(selectedPackage!);
                const newList = [...packages, created];
                setPackages(newList);
                setFilteredPackages(newList);
            }
            handleModalClose();
        } catch (error) {
            console.error("Save failed:", error);
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <div className="flex justify-between items-center mb-4">
                <TextField
                    placeholder="Search packages..."
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ width: "250px" }}
                />
                <Button
                    startIcon={<AddIcon />}
                    variant="contained"
                    onClick={handleCreateClick}
                >
                    Create Package
                </Button>
            </div>

            {loading ? (
                <CircularProgress />
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Price (LKR)</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredPackages.map((pkg) => (
                                <TableRow key={pkg.id}>
                                    <TableCell>{pkg.id}</TableCell>
                                    <TableCell>{pkg.name}</TableCell>
                                    <TableCell>{pkg.description}</TableCell>
                                    <TableCell>{pkg.price}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEditClick(pkg)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredPackages.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <Typography align="center">No packages found.</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Dialog open={openModal} onClose={handleModalClose} maxWidth="sm" fullWidth>
                <DialogTitle>{selectedPackage?.id ? "Edit Package" : "Create Package"}</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Package Name"
                        name="name"
                        value={selectedPackage?.name || ""}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={selectedPackage?.description || ""}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Price"
                        name="price"
                        type="number"
                        value={selectedPackage?.price || ""}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default PackageComponent;