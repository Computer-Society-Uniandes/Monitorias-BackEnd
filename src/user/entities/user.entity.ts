export enum UserMajor {
  ISIS = 'Ingenieria de Sistemas y Computacion',
  IIND = 'Ingenieria Industrial',
  IELE = 'Ingenieria Electronica',
  IBIO = 'Ingenieria Biomedica',
}

// Modelo plano para Firestore
export class User {
  id: string;
  name: string;
  bio?: string;
  phone_number: string;
  major: UserMajor;

  created_at?: FirebaseFirestore.Timestamp | Date;
  updated_at?: FirebaseFirestore.Timestamp | Date;
}
