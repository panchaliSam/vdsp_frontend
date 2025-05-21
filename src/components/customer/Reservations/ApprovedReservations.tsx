import { useEffect, useState } from "react";
import { getApprovedReservations } from "@app_api/ReservationStatusApproval";
import { getReservationById } from "@app_api/Reservation.API";
import { generateHash } from "@app_api/Payment.API";
import { isAlreadyPaid } from "@app_api/Payment.API";
import type { ReservationApprovalDto } from "@app_interfaces/Reservation/RservationApprovalDto";
import type { ReservationDto } from "@app_interfaces/Reservation/ReservationDto";
import type { PaymentRequestDto } from "@app_interfaces/Payment/PaymentRequestDto";
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
  Divider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { PaymentStatus } from "@app_interfaces/Payment/PaymentHistoryDto";

const ApprovedReservations: React.FC = () => {
  const [reservations, setReservations] = useState<ReservationApprovalDto[]>(
    []
  );
  const [selectedReservation, setSelectedReservation] =
    useState<ReservationDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [paymentStatuses, setPaymentStatuses] = useState<{ [reservationId: number]: string }>({});

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getApprovedReservations();
        setReservations(data ?? []);
        // Fetch payment statuses for all reservations
        const statuses: { [reservationId: number]: string } = {};
        await Promise.all(
          (data ?? []).map(async (reservation) => {
            try {
              const details = await getReservationById(reservation.reservationId);
              if (reservation && reservation.paymentStatus) {
                statuses[reservation.reservationId] = reservation.paymentStatus;
              }
            } catch {}
          })
        );
        console.log("Statuses", statuses);
        setPaymentStatuses(statuses);
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

  const handleViewClick = async (reservationId: number) => {
    try {
      const reservationDetails = await getReservationById(reservationId);
      setSelectedReservation(reservationDetails);
    } catch (err) {
      console.error("Failed to fetch reservation details:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch reservation details."
      );
    }
  };

  const handleCloseModal = () => {
    setSelectedReservation(null);
  };

  const handlePaymentProceedClick = async (reservationId: number) => {
    try {
      // Step 1: Check if the reservation is already paid
      const paymentStatus = await isAlreadyPaid({ reservationId });

      if (paymentStatus?.id !== undefined) {
        // Already paid — don't proceed to payment
        return;
      }

      // Step 2: Fetch reservation details
      const reservationDetails = await getReservationById(reservationId);
      if (!reservationDetails) {
        setError("Failed to fetch reservation details for payment.");
        return;
      }

      // Step 3: Prepare the payment request
      const paymentRequest: PaymentRequestDto = {
        orderId: reservationId,
        amount: Number(reservationDetails.priceAmount),
      };

      // Step 4: Generate hash
      const paymentResponse = await generateHash(paymentRequest);

      // Step 5: Navigate to /payment
      navigate("/payment", {
        state: {
          orderId: reservationId,
          amount: paymentRequest.amount,
          hash: paymentResponse,
          items: [reservationDetails.packageName],
        },
      });
    } catch (err) {
      console.error("Payment flow failed:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while preparing the payment."
      );
    }
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
                        onClick={() =>
                          handleViewClick(reservation.reservationId)
                        }
                        sx={{ color: "grey.500" }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      { console.log(paymentStatuses[reservation.reservationId]) }
                      {paymentStatuses[reservation.reservationId] == "SUCCESS" ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#22c55e', fontWeight: 600 }}>
                          <CheckCircleIcon fontSize="small" style={{ color: '#22c55e' }} />
                          Completed
                        </span>
                      ) : (
                        <Button
                          onClick={() =>
                            handlePaymentProceedClick(reservation.reservationId)
                          }
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
                      )}
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
                <Divider sx={{ mb: 2 }} />

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" fontWeight="bold">
                    Type:
                  </Typography>
                  <Typography variant="body1">
                    {selectedReservation.eventType}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" fontWeight="bold">
                    Package Name:
                  </Typography>
                  <Typography variant="body1">
                    {selectedReservation.packageName}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" fontWeight="bold">
                    Total Amount:
                  </Typography>
                  <Typography variant="body1">
                    {selectedReservation.priceAmount}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" fontWeight="bold">
                    Location:
                  </Typography>
                  <Typography variant="body1">
                    {selectedReservation.eventLocation}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" fontWeight="bold">
                    Date:
                  </Typography>
                  <Typography variant="body1">
                    {new Date(selectedReservation.eventDate).toDateString()}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" fontWeight="bold">
                    Start Time:
                  </Typography>
                  <Typography variant="body1">
                    {formatTime(selectedReservation.eventStartTime)}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" fontWeight="bold">
                    End Time:
                  </Typography>
                  <Typography variant="body1">
                    {formatTime(selectedReservation.eventEndTime)}
                  </Typography>
                </Box>

                <Button
                  onClick={handleCloseModal}
                  sx={{
                    mt: 4,
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
                  fullWidth
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