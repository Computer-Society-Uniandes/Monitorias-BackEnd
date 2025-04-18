export class Schedule {
  id: string;
  timezone: string;
  auto_accept_session: boolean;
  min_booking_notice: number;
  max_sessions_per_day: number;
  buffer_time: number;

  tutor_id?: string;
  availability_ids?: string[];
}
