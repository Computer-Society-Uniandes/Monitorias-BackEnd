import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as fs from 'fs';

// Asegúrate de que la inicialización solo ocurra una vez
const serviceAccount = JSON.parse(
  fs.readFileSync(
    './src/config/calico-5980a-firebase-adminsdk-fbsvc-e8b7ee50de.json',
    'utf8',
  ),
);

@Global()
@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        if (!admin.apps.length) {
          return admin.initializeApp({
            credential: admin.credential.cert(
              serviceAccount as admin.ServiceAccount,
            ),
          });
        } else {
          return admin.app(); // Si ya está inicializado, usamos la app existente.
        }
      },
    },
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseModule {}
