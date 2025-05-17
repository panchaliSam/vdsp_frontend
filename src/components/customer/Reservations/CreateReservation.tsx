import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { createReservation } from "@app_api/Reservation.API";
import { getAllPackages, getPackageById } from "@app_api/Package.API";
import type { PackageDto } from "@app_interfaces/Package/PackageDto";
import type { ReservationDto } from "@app_interfaces/Reservation/ReservationDto";

export const EventType = {
  WEDDING: "WEDDING",
  BIRTHDAY: "BIRTHDAY",
  GRADUATION: "GRADUATION",
  CORPORATE: "CORPORATE",
} as const;

export type EventType = (typeof EventType)[keyof typeof EventType];

const CreateReservation = () => {
  const [eventType, setEventType] = useState<string>(EventType.WEDDING);
  const [eventDate, setEventDate] = useState<Date | null>(new Date());
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [packageId, setPackageId] = useState<number | "">("");
  const [eventLocation, setEventLocation] = useState<string>("");
  const [packages, setPackages] = useState<PackageDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [packageInfoOpen, setPackageInfoOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageDto | null>(null);

  // Fetch packages on mount
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getAllPackages();
        setPackages(data);
      } catch {
        setErrorMsg("Failed to fetch packages");
      }
    };
    fetchPackages();
  }, []);

  const handlePackageChange = async (id: number) => {
    setPackageId(id);
    try {
      const pack = await getPackageById(id);
      setSelectedPackage(pack);
    } catch {
      setSelectedPackage(null);
      setErrorMsg("Failed to load package info");
    }
  };

  const handleSubmit = async () => {
    setErrorMsg(null);

    if (
      !packageId ||
      !eventLocation.trim() ||
      !startTime ||
      !endTime ||
      !eventDate
    ) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    if (startTime >= endTime) {
      setErrorMsg("Start time must be before end time.");
      return;
    }

    const today = new Date();
    const daysDifference = Math.ceil(
      (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysDifference < 7) {
      setErrorMsg("Reservations must be made at least 7 days in advance.");
      return;
    }

    const formatToLocalDate = (date: Date) =>
      new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0];

    const formatToTime = (date: Date) =>
      date.toLocaleTimeString("en-US", { hour12: false });

    const reservationData: ReservationDto = {
      eventType: EventType[eventType as keyof typeof EventType],
      eventDate: formatToLocalDate(eventDate),
      eventStartTime: formatToTime(startTime),
      eventEndTime: formatToTime(endTime),
      packageId: packageId as number,
      packageName: selectedPackage?.name || "",
      priceAmount: selectedPackage?.price?.toString() || "",
      eventLocation,
    };

    setLoading(true);
    try {
      await createReservation(reservationData);
      alert("Reservation created successfully!");
      // Optionally reset form here
    } catch (error: any) {
      console.error(error);
      setErrorMsg("Failed to create reservation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset all fields or just notify
    alert("Reservation creation canceled.");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div
        className="flex flex-col md:grid md:grid-cols-2 gap-6 p-8 text-white rounded-lg shadow-xl w-full max-w-3xl mx-auto mt-10"
        style={{ backgroundColor: "#222" }}
      >
        <h1 className="text-2xl font-bold col-span-2 mb-6 text-center">
          Create Reservation
        </h1>

        {/* Error Message */}
        {errorMsg && (
          <Typography
            variant="body1"
            color="error"
            className="col-span-2 text-center mb-4"
          >
            {errorMsg}
          </Typography>
        )}

        {/* Event Type */}
        <FormControl sx={{ mb: 4 }} variant="outlined" required>
          <InputLabel
            sx={{
              color: "white",
              "&.Mui-focused": { color: "white" },
            }}
            shrink
          >
            Event Type
          </InputLabel>
          <Select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            sx={{
              color: "white",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
              "& .MuiSvgIcon-root": { color: "white" },
            }}
            label="Event Type"
          >
            {Object.values(EventType).map((et) => (
              <MenuItem key={et} value={et}>
                {et.charAt(0) + et.slice(1).toLowerCase()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Package Selection with Info */}
        <FormControl
          sx={{ mb: 4 }}
          variant="outlined"
          required
        >
          <InputLabel
            sx={{
              color: "white",
              "&.Mui-focused": { color: "white" },
            }}
            shrink
          >
            Package
          </InputLabel>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Select
              value={packageId}
              onChange={(e) => handlePackageChange(Number(e.target.value))}
              sx={{
                color: "white",
                flex: 1, // Ensures the Select takes up available space
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
                "& .MuiSvgIcon-root": { color: "white" },
              }}
              label="Package"
            >
              <MenuItem value="">Select Package</MenuItem>
              {packages.map((pkg) => (
                <MenuItem key={pkg.id} value={pkg.id}>
                  {pkg.name}
                </MenuItem>
              ))}
            </Select>

            <Tooltip title="View Package Info">
              <IconButton
                onClick={() => setPackageInfoOpen(true)}
                disabled={!packageId}
                sx={{ color: "white" }}
              >
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          </div>
        </FormControl>

        {/* Package Info Modal */}
        <Dialog
          open={packageInfoOpen}
          onClose={() => setPackageInfoOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Package Information</DialogTitle>
          <DialogContent>
            {selectedPackage ? (
              <>
                <Typography variant="h6">{selectedPackage.name}</Typography>
                <Typography>Price: {selectedPackage.price} LKR</Typography>
                <Typography>Description:</Typography>
                <Typography
                  sx={{
                    whiteSpace: "pre-wrap",
                    fontStyle: "italic",
                    mt: 1,
                  }}
                >
                  {selectedPackage.description || "No description available."}
                </Typography>
              </>
            ) : (
              <Typography>No package selected</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPackageInfoOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        <TextField
          label="Event Location (Google Maps Link)"
          variant="outlined"
          type="url"
          value={eventLocation}
          onChange={(e) => {
            const link = e.target.value;
            setEventLocation(link);
          }}
          required
          error={
            Boolean(
              eventLocation &&
              !/^https:\/\/(www\.google\.com\/maps\/|maps\.app\.goo\.gl\/).+$/.test(eventLocation)
            )
          }
          helperText={
            eventLocation &&
              !/^https:\/\/(www\.google\.com\/maps\/|maps\.app\.goo\.gl\/).+$/.test(eventLocation)
              ? "Please enter a valid Google Map link."
              : undefined
          }
          sx={{
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
              "&.Mui-focused fieldset": { borderColor: "white" },
            },
            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiInputLabel-root.Mui-focused": { color: "white" },
            mb: 4,
          }}
        />

        {/* Event Date */}
        <DatePicker
          label="Event Date"
          value={eventDate}
          onChange={(date) => setEventDate(date)}
          slotProps={{
            textField: {
              required: true,
              sx: {
                input: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                mb: 4,
              },
            },
          }}
        />

        {/* Start Time */}
        <TimePicker
          label="Start Time"
          value={startTime}
          onChange={(time) => setStartTime(time)}
          slotProps={{
            textField: {
              required: true,
              sx: {
                input: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                mb: 4,
              },
            },
          }}
        />

        {/* End Time */}
        <TimePicker
          label="End Time"
          value={endTime}
          onChange={(time) => setEndTime(time)}
          slotProps={{
            textField: {
              required: true,
              sx: {
                input: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                mb: 4,
              },
            },
          }}
        />

        {/* Buttons */}
        <div className="flex justify-between col-span-2 mt-4">
          <button
            onClick={handleCancel}
            className="bg-white text-black px-4 py-2 rounded border border-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`bg-white text-black px-4 py-2 rounded border border-gray-300 ${loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default CreateReservation;