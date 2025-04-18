import * as admin from 'firebase-admin';
export class Tutor {
  id: string; // Firestore document ID
  first_name: string;
  last_name: string;
  school_email: string;
  phone_number: string;
  bio?: string;

  experience: number;
  credits: number;
  experience_description: string;

  course_ids: string[];
  availability_ids: string[];
  schedule_id?: string;
  tutoring_session_ids?: string[];
  group_tutoring_session_id?: string[];
  review_ids?: string[];

  created_at: Date | admin.firestore.FieldValue;
  updated_at: Date | admin.firestore.FieldValue;
}
