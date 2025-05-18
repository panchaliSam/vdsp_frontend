import { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { PickersDay } from "@mui/x-date-pickers";
import { format } from "date-fns";

import { createReservation } from "@app_api/Reservation.API";
import { getAllPackages, getPackageById } from "@app_api/Package.API";
import type { PackageDto } from "@app_interfaces/Package/PackageDto";
import type { ReservationDto } from "@app_interfaces/Reservation/ReservationDto";
import { getCalendarDates } from "@app_api/Calendar.API";
import type { CalendarDatesResponse } from "@app_interfaces/Calendar/CalendarDatesResponse";

export const EventType = {
  WEDDING: "WEDDING",
  BIRTHDAY: "BIRTHDAY",
  GRADUATION: "GRADUATION",
  CORPORATE: "CORPORATE",
} as const;

export type EventType = (typeof EventType)[keyof typeof EventType];

type CreateReservationProps = {
  onSuccessNavigate?: () => void;
};


const CreateReservation: React.FC<CreateReservationProps> = ({ onSuccessNavigate }) => {
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
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [calendarData, setCalendarData] = useState<CalendarDatesResponse | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      const data = await getAllPackages();
      if (data) setPackages(data);
    };
    fetchPackages();
  }, []);

  const handlePackageChange = async (id: number) => {
    setPackageId(id);
    const pack = await getPackageById(id);
    setSelectedPackage(pack);
  };

  useEffect(() => {
    const fetchCalendar = async () => {
      const data = await getCalendarDates();
      if (data) setCalendarData(data);
    };
    fetchCalendar();
  }, []);

  const handleSubmit = async () => {
    setErrorMsg(null);

    if (!packageId || !eventLocation.trim() || !startTime || !endTime || !eventDate) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    if (startTime >= endTime) {
      setErrorMsg("Start time must be before end time.");
      return;
    }

    const today = new Date();
    const daysDifference = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDifference < 7) {
      setErrorMsg("Reservations must be made at least 7 days in advance.");
      return;
    }

    const formatToLocalDate = (date: Date) =>
      new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split("T")[0];
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
      setSuccessModalOpen(true);
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to create reservation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
    onSuccessNavigate?.();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div
        className="flex flex-col md:grid md:grid-cols-2 gap-6 p-8 text-white rounded-lg shadow-xl w-full max-w-3xl mx-auto mt-10"
        style={{ backgroundColor: "#222" }}
      >
        <h1 className="text-2xl font-bold col-span-2 mb-6 text-center">Create Reservation</h1>

        {errorMsg && (
          <Typography variant="body1" color="error" className="col-span-2 text-center mb-4">
            {errorMsg}
          </Typography>
        )}

        {/* Event Type */}
        <FormControl sx={{ mb: 4 }} required>
          <InputLabel sx={{ color: "white", "&.Mui-focused": { color: "white" } }} shrink>
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

        {/* Package Selection */}
        <FormControl sx={{ mb: 4 }} required>
          <InputLabel sx={{ color: "white", "&.Mui-focused": { color: "white" } }} shrink>
            Package
          </InputLabel>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Select
              value={packageId}
              onChange={(e) => handlePackageChange(Number(e.target.value))}
              sx={{
                color: "white",
                flex: 1,
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

            <Tooltip title="Browse All Packages">
              <IconButton onClick={() => setPackageInfoOpen(true)} sx={{ color: "white" }}>
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          </div>

          {selectedPackage && (
            <Typography variant="caption" className="text-green-300" sx={{ mt: 1 }}>
              Selected Package: {selectedPackage.name}
            </Typography>
          )}
        </FormControl>

        <Dialog
          open={packageInfoOpen}
          onClose={() => setPackageInfoOpen(false)}
          maxWidth="md" // wider than "sm"
          fullWidth
        >
          <DialogTitle
            sx={{ fontWeight: "bold", fontSize: "1.5rem", color: "#fff" }}
          >
            Select a Package
          </DialogTitle>

          <DialogContent sx={{ padding: 0 }}>
            {packages.length > 0 ? (
              <div className="overflow-x-auto p-4">
                <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden shadow-md">
                  <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                    <tr>
                      <th className="px-6 py-3 text-left">Name</th>
                      <th className="px-6 py-3 text-left">Price (LKR)</th>
                      <th className="px-6 py-3 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100 text-gray-800">
                    {packages.map((pkg) => (
                      <tr
                        key={pkg.id}
                        onClick={() => {
                          if (pkg.id !== undefined) {
                            setPackageId(pkg.id);
                            setSelectedPackage(pkg);
                            setPackageInfoOpen(false);
                          }
                        }}
                        className="cursor-pointer hover:bg-blue-50 hover:text-blue-900 transition duration-150"
                      >
                        <td className="px-6 py-3 font-medium">{pkg.name}</td>
                        <td className="px-6 py-3">{pkg.price}</td>
                        <td className="px-6 py-3">{pkg.description?.slice(0, 60) || "No description"}...</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <Typography className="text-center p-4 text-gray-700">No packages available</Typography>
            )}
          </DialogContent>

          <DialogActions sx={{ justifyContent: "flex-end", padding: "1rem" }}>
            <Button onClick={() => setPackageInfoOpen(false)} variant="outlined" color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Event Location */}
        <TextField
          label="Event Location (Google Maps Link)"
          variant="outlined"
          type="url"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
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

        {/* Date & Time Pickers */}
        <DatePicker
          label="Event Date"
          value={eventDate}
          onChange={(newDate) => setEventDate(newDate)}
          shouldDisableDate={(date) => {
            const d = format(date, "yyyy-MM-dd");

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const selected = new Date(date);
            selected.setHours(0, 0, 0, 0);

            const isHoliday = calendarData?.holidays.some(h => h.date === d);
            const isApprovedFullDay = calendarData?.approvedEventDatesWithSessionType.filter(e => e.eventDate === d).length === 2;

            const isPastOrToday = selected <= today;

            return Boolean(isHoliday) || isApprovedFullDay || isPastOrToday;
          }}
          slots={{
            day: (props) => {
              const d = format(props.day, "yyyy-MM-dd");

              const approvedSessions = calendarData?.approvedEventDatesWithSessionType.filter(e => e.eventDate === d) || [];
              const pendingSessions = calendarData?.pendingEventDatesWithSessionType.filter(e => e.eventDate === d) || [];
              const holiday = calendarData?.holidays.find(h => h.date === d);

               const tooltip = holiday
                ? `Holiday - ${holiday.name}`
                : approvedSessions.length === 2
                  ? "Fully booked – Reservation not available"
                  : pendingSessions.length
                    ? "Pending reservation – may not approve"
                    : approvedSessions.length === 1
                      ? `Approved ${approvedSessions[0].sessionType.toLowerCase().replace("_"," ")} session`
                      : "";


              return (
                <Tooltip title={tooltip}>
                  <span>
                    <PickersDay
                      {...props}
                      disabled={Boolean(holiday) || approvedSessions.length === 2}
                      sx={{
                        position: "relative",
                        "&::before": approvedSessions.some(s => s.sessionType === 'MORNING_SESSION') ? {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: "50%",
                          backgroundColor: "	#FFBF00",
                          opacity: 0.5,
                          zIndex: 1,
                        } : undefined,
                        "&::after": approvedSessions.some(s => s.sessionType === 'EVENING_SESSION') ? {
                          content: '""',
                          position: "absolute",
                          top: "50%",
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: "	#FFBF00",
                          opacity: 0.5,
                          zIndex: 1,
                        } : undefined,
                        backgroundColor: pendingSessions.length ? "#008000" : undefined,
                      }}
                    />
                  </span>
                </Tooltip>
              );
            }
          }}
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
              }
            }
          }}
        />

        <TimePicker
          label="Start Time"
          value={startTime}
          onChange={(time) => setStartTime(time)}
          ampm
          closeOnSelect
          slotProps={{
            textField: {
              required: true,
              helperText: "Select event start time",
              sx: {
                input: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                "& .MuiFormHelperText-root": { color: "#ccc" },
                mb: 4,
              },
            },
          }}
        />


        <TimePicker
          label="End Time"
          value={endTime}
          onChange={(time) => setEndTime(time)}
          ampm
          closeOnSelect
          slotProps={{
            textField: {
              required: true,
              helperText: "Select event end time",
              sx: {
                input: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                "& .MuiFormHelperText-root": { color: "#ccc" },
                mb: 4,
              },
            },
          }}
        />

        <Dialog open={successModalOpen} onClose={() => setSuccessModalOpen(false)}>
          <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CheckCircleOutlineIcon sx={{ color: "green" }} />
            Reservation Submitted!
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Your reservation has been sent for approval. <br />
              Once approved, you'll be able to proceed with the payment.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSuccessModalClose}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>

        {/* Buttons */}
        <div className="flex justify-between col-span-2 mt-4">
          <button
            onClick={() => alert("Reservation creation canceled.")}
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