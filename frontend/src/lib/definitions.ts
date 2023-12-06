export interface Reservation {
  reservationId: string;
  title: string;
  start_at: string;
  end_at: string;
}

export interface CreateFormProps {
    addReservation: (reservation: any) => void;
  }
  
export interface ErrorAlertProps {
  message: string;
  closeErr: () => void;
}

export interface ReservationTableProps {
  reservations: Reservation[];
  onDelete: (reservationId: string) => void;
}
