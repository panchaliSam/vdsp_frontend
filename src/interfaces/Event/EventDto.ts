import type { ReservationDto } from "@app_interfaces/Reservation/ReservationDto";

export interface EventDto {
    id: number;
    reservationId: number;
    eventDate: string;
    albumStatus: AlbumStatus;
    reservationDetails: ReservationDto;
}

export type AlbumStatus = "IN_PROGRESS" | "COMPLETED";