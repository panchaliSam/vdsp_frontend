export interface PaymentHistoryDto {
    paymentId: number;
    cardNo: string;
    cardExpiry: string;
    paymentMethod: string;
    currency: string;
    amount: number;
    status: PaymentStatus;
    reservationId: number;
    eventType: string;
    eventDate: string; // ISO date string, e.g. "2025-10-14"
}

export type PaymentStatus = 'SUCCESS' | 'FAILED' | 'PENDING' | string; 