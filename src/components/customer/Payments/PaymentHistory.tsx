import { useEffect, useState } from "react";
import { getPaymentHistory } from "@app_api/Payment.API";
import { downloadConfirmationReport } from "@app_api/Payment.API"
import type { PaymentHistoryDto } from "@app_interfaces/Payment/PaymentHistoryDto";
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
    IconButton,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

const PaymentHistory: React.FC = () => {
    const [payments, setPayments] = useState<PaymentHistoryDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const history = await getPaymentHistory();
                if (Array.isArray(history)) {
                    setPayments(history);
                } else {
                    setPayments([]);
                    setError("No payment history found.");
                }
            } catch (err) {
                setError("Failed to fetch payment history.");
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "SUCCESS":
                return "success";
            case "FAILED":
                return "error";
            case "PENDING":
                return "warning";
            default:
                return "default";
        }
    };

    const handleDownloadReport = async (reservationId: number) => {
        try {
            await downloadConfirmationReport(reservationId);
        } catch (err) {
            console.error("Failed to download report:", err);
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            {/* <Typography variant="h5" gutterBottom>
                Payment History
            </Typography> */}

            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Payment ID</TableCell>
                                <TableCell>Reservation ID</TableCell>
                                <TableCell>Event</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Card</TableCell>
                                <TableCell>Method</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Report</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {payments.map((payment) => (
                                <TableRow key={payment.paymentId}>
                                    <TableCell>{payment.paymentId}</TableCell>
                                    <TableCell>{payment.reservationId}</TableCell>
                                    <TableCell>{payment.eventType}</TableCell>
                                    <TableCell>{new Date(payment.eventDate).toDateString()}</TableCell>
                                    <TableCell>
                                        {payment.amount} {payment.currency}
                                    </TableCell>
                                    <TableCell>{payment.cardNo}</TableCell>
                                    <TableCell>{payment.paymentMethod}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={payment.status}
                                            color={getStatusColor(payment.status)}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={() => handleDownloadReport(payment.reservationId)}
                                            title="Download Confirmation Letter"
                                        >
                                            <DownloadIcon />
                                        </IconButton>
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

export default PaymentHistory;