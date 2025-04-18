import * as admin from 'firebase-admin';

export class Major {
  id: string;
  name: string;
  code: string;
  department: string;
  duration: number;
  description?: string;
  created_at: admin.firestore.Timestamp | Date;
  updated_at: admin.firestore.Timestamp | Date;
  is_active: boolean;
  courses: string[];
}
