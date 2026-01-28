import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { storeCoverImage } from "./storeCoverImage";

export const storeAssignment = async (assignment, coverImage) => {
  try {
    if (!Object.keys(assignment).length) {
      console.error("Assignment Data is required");
      return;
    }

    if (!coverImage) {
      console.error("Cover image is required");
      return;
    }

    const { uid, email } = JSON.parse(sessionStorage.getItem("user"));

    const docRef = doc(
      db,
      "assignment-users",
      uid,
      "courses",
      assignment.courseName.toLowerCase(),
    );

    const fullPath = await storeCoverImage(email, coverImage);
    await setDoc(
      docRef,
      {
        assignments: arrayUnion({
          ...assignment,
          courseName: assignment.courseName.toLowerCase(),
          assignmentName: assignment.assignmentName.toLowerCase(),
          assignmentCoverImage: fullPath,
          createdAt: Date.now(),
        }),
      },
      { merge: true },
    );
  } catch (error) {
    console.log(error);
  }
};
