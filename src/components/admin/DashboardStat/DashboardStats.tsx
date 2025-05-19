import React, { useEffect, useState } from "react";
import { getDashboardStats } from "@app_api/Dashboard.API";
import type { DashboardStatsDto } from "@app_interfaces/AdminDashboard/DashboardStatsDto";
import {
    Box,
    Card,
    CardContent,
    Typography,
    MenuItem,
    FormControl,
    Select,
    InputLabel,
    Button,
} from "@mui/material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "@app_assets/logo/png/logo-no-background.png";

const DashboardStats: React.FC = () => {
    const currentDate = new Date();
    const [year, setYear] = useState<number>(currentDate.getFullYear());
    const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
    const [stats, setStats] = useState<DashboardStatsDto | null>(null);

    useEffect(() => {
        fetchStats(year, month);
    }, [year, month]);

    const fetchStats = async (year: number, month: number) => {
        try {
            const data = await getDashboardStats(year, month);
            setStats(data);
        } catch (error) {
            console.error(error);
        }
    };

    const statLabels = [
        "Total Successful Payments",
        "Total Events",
        "Total Staff",
        "Total Customers",
        "Events in Selected Month",
        "Events in Selected Year",
    ];

    const statValues = stats
        ? [
            `LKR ${stats.totalSuccessfulPayments.toFixed(2)}`,
            stats.totalEvents,
            stats.totalStaff,
            stats.totalCustomers,
            stats.monthlyEventCount,
            stats.yearlyEventCount,
        ]
        : Array(6).fill("Loading...");

    const generateReport = () => {
        const doc = new jsPDF();
        const dateStr = new Date().toLocaleDateString();

        // Add logo
        const img = new Image();
        img.src = logo;
        img.onload = () => {
            doc.addImage(img, "PNG", 80, 10, 50, 20); // Adjust as needed

            // Title
            doc.setFontSize(16);
            doc.text("Vidura De Silva Photography", 105, 40, { align: "center" });
            doc.setFontSize(14);
            doc.text("Admin Report", 105, 50, { align: "center" });

            // Date & Filter Info
            doc.setFontSize(11);
            doc.text(`Issued Date: ${dateStr}`, 14, 65);
            doc.text(`Selected Year: ${year}`, 14, 72);
            doc.text(`Selected Month: ${new Date(0, month - 1).toLocaleString("default", { month: "long" })}`, 14, 79);

            // Add Stats Table
            const tableData = statLabels.map((label, index) => [
                label,
                statValues[index],
            ]);

            autoTable(doc, {
                startY: 90,
                head: [["Statistic", "Value"]],
                body: tableData,
                theme: "grid",
                headStyles: { fillColor: [100, 100, 255] },
            });

            // Save PDF
            doc.save("Admin_Report.pdf");
        };
    };

    return (
        <Box p={4}>
            {/* Filters */}
            <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                gap={2}
                mb={4}
                flexWrap="wrap"
            >
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Year</InputLabel>
                    <Select
                        value={year}
                        label="Year"
                        onChange={(e) => setYear(Number(e.target.value))}
                    >
                        {[2023, 2024, 2025].map((y) => (
                            <MenuItem key={y} value={y}>
                                {y}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Month</InputLabel>
                    <Select
                        value={month}
                        label="Month"
                        onChange={(e) => setMonth(Number(e.target.value))}
                    >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                            <MenuItem key={m} value={m}>
                                {new Date(0, m - 1).toLocaleString("default", {
                                    month: "long",
                                })}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button variant="contained" color="primary" onClick={generateReport}>
                    Generate Report
                </Button>
            </Box>

            {/* Cards */}
            <Box display="flex" flexWrap="wrap" gap={3} justifyContent="center">
                {statLabels.map((label, index) => (
                    <Box
                        key={index}
                        flexBasis="300px"
                        flexGrow={1}
                        minWidth="260px"
                        maxWidth="400px"
                    >
                        <Card
                            sx={{
                                background: gradientColors[index % gradientColors.length],
                                color: "white",
                                borderRadius: 3,
                                boxShadow: 4,
                                height: "100%",
                            }}
                        >
                            <CardContent>
                                <Typography variant="subtitle1" gutterBottom>
                                    {label}
                                </Typography>
                                <Typography variant="h5" fontWeight="bold">
                                    {statValues[index]}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default DashboardStats;

const gradientColors = [
    "linear-gradient(to right, #667eea, #764ba2)",
    "linear-gradient(to right, #43cea2, #185a9d)",
    "linear-gradient(to right, #f7971e, #ffd200)",
    "linear-gradient(to right, #ff6a00, #ee0979)",
    "linear-gradient(to right, #56ab2f, #a8e063)",
    "linear-gradient(to right, #1d2b64, #f8cdda)",
];