import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage, ref, StringFormat, uploadString } from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

export const firebase = initializeApp(firebaseConfig);
export const database = getFirestore(firebase);
export const auth = getAuth();
export const dbInstanceUsers = collection(database, "users");
export const dbInstancesUsersFinances = collection(database, "users_finances");
export const dbInstanceConfig = collection(database, "config_percent");
export const dbInstanceYield = collection(database, "users_yield");
export const dbInstanceLogs = collection(database, "yield_logs");
export const dbInstanceWithdraw = collection(database, "users_withdraw");

export const storage = getStorage();

export const uploadFile = async (
  file: string,
  format: StringFormat = "base64"
) => {
  try {
    const randomUuid = v4();
    const storageRef = ref(storage, `images/${randomUuid}`);

    await uploadString(storageRef, file, format);

    return randomUuid;
  } catch (e) {
    console.log("🚀 ~ file: firebase.ts ~ line 32 ~ e", e);
    throw new Error("Error uploading file");
  }
};
