import * as admin from 'firebase-admin';

export class GroupTutoringSession {
  id: string;
  start_hour: admin.firestore.Timestamp;
  end_hour: admin.firestore.Timestamp;
  notes: string;
  status: string;
  time_added: number;
  price: number;
  course_id: string;
  student_ids?: string[];
  tutor_ids?: string[];
}
