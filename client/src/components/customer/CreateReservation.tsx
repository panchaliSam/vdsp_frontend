import { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { createReservation } from "@app_api/Reservation.API";
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
  const [packageId, setPackageId] = useState<string>("");
  const [eventLocation, setEventLocation] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!packageId || !eventLocation || !startTime || !endTime) {
      alert("Please fill in all required fields.");
      return;
    }

    if (startTime >= endTime) {
      alert("Start time must be before end time.");
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
      eventDate: eventDate ? formatToLocalDate(eventDate) : "",
      eventStartTime: startTime ? formatToTime(startTime) : "",
      eventEndTime: endTime ? formatToTime(endTime) : "",
      packageId: Number(packageId),
      eventLocation,
    };

    setLoading(true);

    try {
      const response = await createReservation(reservationData);
      console.log("Reservation created successfully:", response);
      alert("Reservation created successfully!");
    } catch (error) {
      console.error("Error creating reservation:", error);
      alert("Failed to create reservation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="flex mt-10 ml-10 flex-col h-screen">
        <h1 className="text-2xl font-bold mb-4">Create Reservation</h1>

        <FormControl sx={{ mb: 4, minWidth: 200 }}>
          <InputLabel sx={{ color: "white" }}>Event Type</InputLabel>
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
          >
            <MenuItem value={EventType.WEDDING}>Wedding</MenuItem>
            <MenuItem value={EventType.BIRTHDAY}>Birthday</MenuItem>
            <MenuItem value={EventType.GRADUATION}>Graduation</MenuItem>
            <MenuItem value={EventType.CORPORATE}>Corporate</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Package ID"
          variant="outlined"
          type="number"
          value={packageId}
          onChange={(e) => setPackageId(e.target.value)}
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

        <TextField
          label="Event Location (Google Maps URL)"
          variant="outlined"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
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

        <DatePicker
          label="Event Date"
          value={eventDate}
          onChange={(date) => setEventDate(date)}
          slotProps={{
            textField: {
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

        <TimePicker
          label="Start Time"
          value={startTime}
          onChange={(time) => setStartTime(time)}
          slotProps={{
            textField: {
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

        <TimePicker
          label="End Time"
          value={endTime}
          onChange={(time) => setEndTime(time)}
          slotProps={{
            textField: {
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

        <button
          onClick={handleSubmit}
          className={`bg-blue-500 text-white px-4 py-2 rounded mt-4 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </LocalizationProvider>
  );
};

export default CreateReservation;
