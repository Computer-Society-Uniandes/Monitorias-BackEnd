export class Student {
  id: string; // Firebase Doc ID
  userId: string; // referencia manual al usuario base

  name: string;
  bio: string;
  phone_number: string;
  major: string;

  // Relaciones por ID
  group_tutoring_session_id?: string[]; // Referencias a sesiones grupales
  tutoring_session_ids?: string[]; // Referencias a sesiones 1:1

  created_at?: FirebaseFirestore.Timestamp;
  updated_at?: FirebaseFirestore.Timestamp;
}
