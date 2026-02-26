import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";

export const isUserExist = async (email) => {
  try {
    const docRef = doc(db, "assignment-users", email);
    const userDoc = await getDoc(docRef);
    return userDoc.exists();
  } catch (error) {
    console.log(error);
  }
};
