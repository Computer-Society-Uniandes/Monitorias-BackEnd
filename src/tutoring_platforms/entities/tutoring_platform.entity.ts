export class TutoringPlatform {
  id: string;
  name: string;
  url: string;
  description: string | null;
  is_active: boolean;
  instructions: string | null;
  tutoring_sessions: any[];
  group_tutoring_sessions: any[];
}
