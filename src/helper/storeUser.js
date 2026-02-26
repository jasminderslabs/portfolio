import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseconfig";
import { storeProfileImage } from "./storeProfileImage";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const storeUser = async (userData, profileImageFile) => {
  try {
    if (!Object.keys(userData).length) {
      console.error("User details are required");
      return;
    }

    const user = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password,
    );

    const filePath = await storeProfileImage(userData.email, profileImageFile);

    const docRef = doc(db, "assignment-users", user.user.uid);
    await setDoc(docRef, {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      profileImage: filePath.metadata.fullPath,
      uid: user.user.uid,
      roles: ["user"],
      createdAt: Date.now(),
    });

    if (user.user.uid) return true;
    return false;
  } catch (error) {
    console.log(error);
    if (error.code) alert(error.code.replace(/-/g, " "));
  }
};
