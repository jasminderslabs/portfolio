import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseconfig";

export const deleteCourse = async (uid, courseName) => {
  try {
    if (!uid && !courseName) {
      alert("Invalid delete Operation");
      return;
    }

    const docRef = doc(db, "assignment-users", uid, "courses", courseName);
    await deleteDoc(docRef);
  } catch (error) {
    console.log(error);
    alert(error.code.replace(/-/g, " "));
  }
};
