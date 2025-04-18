export class TutoringPlatform {
  id: string; // Firestore generará un ID automáticamente si no lo pasas
  name: string;
  url: string;
  description: string | null;
  is_active: boolean;
  instructions: string | null;
  tutoring_sessions: any[];
  group_tutoring_sessions: any[];
}
