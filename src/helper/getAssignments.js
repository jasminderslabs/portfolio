import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { getCoverImage } from "./getCoverImage";
import { getAllUsers } from "./getAllUsers";

export const getAssignments = async () => {
  try {
    const { uid, roles } = JSON.parse(sessionStorage.getItem("user"));

    const collectionRef = collection(db, "assignment-users", uid, "courses");
    const docs = await getDocs(collectionRef);

    const assignments = [];
    let id = 1;
    docs.docs.forEach((obj) => {
      obj.data().assignments.forEach((assignment, index) => {
        assignments.push({ ...assignment, id: id++ });
      });
    });
    const result = assignments.map(async (assignment) => {
      const url = await getCoverImage(assignment.assignmentCoverImage);
      return {
        ...assignment,
        assignmentCoverImage: url,
      };
    });

    return await Promise.all(result);
  } catch (error) {
    console.log(error);
    alert(error.code.replace(/-/g, " "));
  }
};
