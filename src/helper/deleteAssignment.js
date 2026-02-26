import { deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";

export const deleteAssignment = async (uid, courseName, assignmentName) => {
  try {
    if (!uid && !courseName) {
      alert("Invalid delete Operation");
      return;
    }
    console.log(uid, courseName, assignmentName);
    const docRef = doc(
      db,
      "assignment-users",
      uid,
      "courses",
      courseName.toLowerCase(),
    );

    const assignments = await getDoc(docRef);
    const deletedAssignment = assignments.data().assignments;

    await updateDoc(docRef, {
      assignments: deletedAssignment.filter(
        (assignment) => assignment.assignmentName !== assignmentName,
      ),
    });
  } catch (error) {
    console.log(error);
    alert(error.code.replace(/-/g, " "));
  }
};
