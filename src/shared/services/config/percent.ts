/* eslint-disable no-nested-ternary */
import { addDoc, getDocs, query, where } from "firebase/firestore";

import { dbInstanceConfig, dbInstanceLogs } from "../firebase";

export async function getGlobalPercent() {
  const queryPercentGlobal = query(dbInstanceConfig);
  const queryResultGlobal = await getDocs(queryPercentGlobal);

  const globalPercent = queryResultGlobal.docs.find(
    (d) => d.id === "global_percent"
  );

  return parseFloat(globalPercent?.data().percent);
}

export async function getPercentByValue(totalPercent: number) {
  const value = totalPercent >= 5000 ? 5000 : totalPercent >= 2000 ? 2000 : 500;

  const queryPercent = query(dbInstanceConfig, where("amountMin", "==", value));

  const getPercent = await getDocs(queryPercent);

  // percent max
  const percent = parseFloat(getPercent.docs[0]?.data().percent);

  return percent;
}

export type LogsProps = {
  userId: string;
  amount: number;
  amountPercent: number;
  userPercent: number;
};

export async function createLogs({
  userId,
  amount,
  amountPercent,
  userPercent,
}: LogsProps) {
  try {
    addDoc(dbInstanceLogs, {
      userId,
      amount,
      amountPercent,
      userPercent,
      createdAt: new Date().getTime(),
      status: "created",
    });

    return true;
  } catch (e) {
    return false;
  }
}
