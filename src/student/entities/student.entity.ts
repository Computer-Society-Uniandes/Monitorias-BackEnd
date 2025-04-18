export class Student {
  id: string;
  userId: string;

  name: string;
  bio: string;
  phone_number: string;
  major: string;

  group_tutoring_session_id?: string[];
  tutoring_session_ids?: string[];

  created_at?: FirebaseFirestore.Timestamp;
  updated_at?: FirebaseFirestore.Timestamp;
}
