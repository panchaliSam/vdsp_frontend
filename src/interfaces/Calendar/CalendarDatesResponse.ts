import type { CalendarEventDto } from "./CalendarEventDto";
import type { HolidayDto } from "@app_interfaces/Calendar/HolidayDto";

export interface CalendarDatesResponse {
    approvedEventDatesWithSessionType: CalendarEventDto[];
    pendingEventDatesWithSessionType: CalendarEventDto[];
    holidays: HolidayDto[];
}