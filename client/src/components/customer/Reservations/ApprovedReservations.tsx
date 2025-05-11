import { useEffect, useState } from "react";
import { getApprovedReservations } from "@app_api/ReservationStatusApproval";
import type { ReservationApprovalDto } from "@app_interfaces/Reservation/RservationApprovalDto";
import {
  Container,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Modal,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility"; // Import the eye icon

const ApprovedReservations = () => {
  const [reservations, setReservations] = useState<ReservationApprovalDto[]>(
    []
  );
  const [selectedReservation, setSelectedReservation] =
    useState<ReservationApprovalDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getApprovedReservations();
        setReservations(data);
      } catch (err) {
        console.error(err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch reservations."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "linear-gradient(45deg, #4caf50, #8bc34a)";
      case "PENDING":
        return "linear-gradient(45deg, #ff9800, #ff5722)";
      case "DISAPPROVED":
        return "linear-gradient(45deg, #f44336, #d32f2f)";
      default:
        return "linear-gradient(45deg, #9e9e9e, #bdbdbd)";
    }
  };

  const formatTime = (time: string) => {
    const parsedTime = new Date(`1970-01-01T${time}`);

    if (isNaN(parsedTime.getTime())) {
      console.warn("Invalid Time: ", time);
      return "Invalid Time";
    }

    return parsedTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleViewClick = (reservation: ReservationApprovalDto) => {
    setSelectedReservation(reservation);
  };

  const handleCloseModal = () => {
    setSelectedReservation(null);
  };

  return (
    <Container sx={{ mt: 4, mb: 4, px: isSmallScreen ? 2 : 4 }}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Session</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>Payment</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reservations.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell>{reservation.id}</TableCell>
                    <TableCell>{reservation.eventType}</TableCell>
                    <TableCell>
                      {new Date(reservation.eventDate).toDateString()}
                    </TableCell>
                    <TableCell>
                      {reservation.sessionType.replace("_SESSION", "")}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={reservation.status}
                        style={{
                          borderRadius: "20px",
                          background: getStatusColor(reservation.status),
                          color: "#fff",
                          padding: "5px 15px",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleViewClick(reservation)}
                        sx={{ color: "grey.500" }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        disabled={reservation.status !== "APPROVED"}
                        sx={{
                          borderRadius: "20px",
                          padding: "5px 15px",
                          textTransform: "none",
                          bgcolor:
                            reservation.status === "APPROVED"
                              ? "white"
                              : "gray",
                          color:
                            reservation.status === "APPROVED"
                              ? "black"
                              : "white",
                          border:
                            reservation.status === "APPROVED"
                              ? "1px solid black"
                              : "1px solid gray",
                          "&:hover": {
                            bgcolor:
                              reservation.status === "APPROVED"
                                ? "black"
                                : "gray",
                            color:
                              reservation.status === "APPROVED"
                                ? "white"
                                : "white",
                          },
                        }}
                      >
                        Proceed
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {selectedReservation && (
            <Modal open={!!selectedReservation} onClose={handleCloseModal}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: isSmallScreen ? "90%" : 400,
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Reservation Details
                </Typography>

                <Typography variant="body1" gutterBottom>
                  <strong>ID:</strong> {selectedReservation.id}
                </Typography>

                <Typography variant="body1" gutterBottom>
                  <strong>Type:</strong> {selectedReservation.eventType}
                </Typography>

                <Typography variant="body1" gutterBottom>
                  <strong>Package:</strong> {selectedReservation.packageId}
                </Typography>

                <Typography variant="body1" gutterBottom>
                  <strong>Location:</strong> {selectedReservation.eventLocation}
                </Typography>

                <Typography variant="body1" gutterBottom>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedReservation.eventDate).toDateString()}
                </Typography>

                <Typography variant="body1" gutterBottom>
                  <strong>Start Time:</strong>{" "}
                  {formatTime(selectedReservation.eventStartTime)}
                </Typography>

                <Typography variant="body1" gutterBottom>
                  <strong>End Time:</strong>{" "}
                  {formatTime(selectedReservation.eventEndTime)}
                </Typography>

                <Typography variant="body1" gutterBottom>
                  <strong>Session:</strong>{" "}
                  {selectedReservation.sessionType.replace("_SESSION", "")}
                </Typography>

                <Typography variant="body1" gutterBottom>
                  <strong>Status:</strong> {selectedReservation.status}
                </Typography>

                <Button
                  onClick={handleCloseModal}
                  sx={{
                    mt: 2,
                    borderRadius: "20px",
                    bgcolor: "white",
                    color: "black",
                    border: "1px solid black",
                    "&:hover": {
                      bgcolor: "black",
                      color: "white",
                    },
                  }}
                  variant="outlined"
                >
                  Close
                </Button>
              </Box>
            </Modal>
          )}
        </>
      )}
    </Container>
  );
};

export default ApprovedReservations;
