import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { getCoverImage } from "./getCoverImage";
import { getUserProfileImage } from "./getProfileImage";

export const getAllUsers = async () => {
  try {
    const collectionRef = collection(db, "assignment-users");
    const usersId = await getDocs(collectionRef);

    const allUsers = await getUser(usersId);

    return allUsers.sort((a, b) => {
      return a.id - b.id;
    });
  } catch (error) {
    console.log(error);
    alert(error.code.replace(/-/g, " "));
  }
};

const getUser = async (usersId) => {
  let idCounter = 1;

  const allUsersResults = await Promise.all(
    usersId.docs.map(async (userDoc) => {
      const userData = userDoc.data();
      const uid = userData.uid;

      const collectionRef = collection(db, "assignment-users", uid, "courses");
      const coursesSnapshot = await getDocs(collectionRef);

      if (coursesSnapshot.empty) {
        const resultantUser = [
          {
            ...userData,
            id: idCounter++,
            url: await getUserProfileImage(userData.profileImage),
          },
        ];
        return resultantUser;
      }

      const coursePromises = coursesSnapshot.docs.map(async (courseDoc) => {
        const courseData = courseDoc.data();
        const assignments = courseData.assignments || [];

        return await Promise.all(
          assignments.map(async (assignment) => {
            const url = await getCoverImage(assignment.assignmentCoverImage);
            return {
              ...userData,
              ...assignment,
              assignmentCoverImage: url,
              id: idCounter++,
              url: await getUserProfileImage(userData.profileImage),
            };
          }),
        );
      });

      const nestedAssignments = await Promise.all(coursePromises);
      return nestedAssignments.flat();
    }),
  );

  return allUsersResults.flat();
};
