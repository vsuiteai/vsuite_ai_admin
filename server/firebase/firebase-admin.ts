import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} from "firebase-admin/firestore";

initializeApp({ credential: applicationDefault() });
// initializeApp({
//   credential: cert(
//     "/Users/mac/Projects/Marcus Ben/webapp_v2/main_website_admin/credentials/cred_firebase.json"
//   ),
// });

const firestore_db = getFirestore("benjamin-strategy-non-rel-db");

export { firestore_db };
