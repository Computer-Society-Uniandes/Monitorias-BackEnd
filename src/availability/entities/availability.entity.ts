export enum Recurrence {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
  NEVER = 'never',
}

export enum Weekday {
  SUNDAY = 'sunday',
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
}

export class Availability {
  id: string;

  start_hour: Date;
  end_hour: Date;
  blackout_date?: Date;

  recurrence: Recurrence;
  weekday: Weekday;

  tutor_id: string;
  schedule_id: string;
}
