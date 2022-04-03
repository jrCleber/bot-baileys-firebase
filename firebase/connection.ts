/* eslint-disable prettier/prettier */
import * as admin from 'firebase-admin';
import key from './token/serviceAccountKey.json';

/**
 * setting up the database connection
 * @AccountKey https://console.firebase.google.com/u/0/project/{your-project}/settings/serviceaccounts/adminsdk
 */
export class DbConn {
   constructor(
      public nameApp?: string,
      private readonly _serviceAccountKey: admin.ServiceAccount = {
         privateKey: key.private_key,
         projectId: key.project_id,
         clientEmail: key.client_email,
      },
      public readonly instance = admin
         .initializeApp(
            { credential: admin.credential.cert(_serviceAccountKey) },
            nameApp
               ?.split('')
               .sort(() => 0.5 - Math.random())
               .join(''),
         )
         .firestore(),
   ) { }
}
