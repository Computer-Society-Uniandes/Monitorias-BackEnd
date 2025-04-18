export class Topic {
  id: string;
  name: string;
  description: string;
  course_id: string;
  tutoring_session_ids?: string[];
  created_at?: FirebaseFirestore.Timestamp | Date;
  updated_at?: FirebaseFirestore.Timestamp | Date;
}
