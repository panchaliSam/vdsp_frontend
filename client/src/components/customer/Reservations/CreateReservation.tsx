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

    if (eventDate) {
      const today = new Date();
      const daysDifference = Math.ceil(
        (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysDifference < 7) {
        alert("Reservations must be made at least 7 days in advance.");
        return;
      }
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
    } catch (error: any) {
      console.error("Error creating reservation:", error);
      if (error.response && error.response.status === 401) {
        alert("Authorization failed. Please log in again.");
      } else {
        alert("Failed to create reservation. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    alert("Reservation creation canceled.");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="flex flex-col md:grid md:grid-cols-2 gap-6 p-8  text-white rounded-lg shadow-xl w-full max-w-3xl mx-auto mt-10">
        <h1 className="text-2xl font-bold col-span-2 mb-6 text-center">
          Create Reservation
        </h1>

        <FormControl sx={{ mb: 4 }} variant="outlined">
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

        <div className="flex justify-between col-span-2 mt-4">
          <button
            onClick={handleCancel}
            className="bg-white text-black px-4 py-2 rounded border border-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`bg-white text-black px-4 py-2 rounded border border-gray-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default CreateReservation;
