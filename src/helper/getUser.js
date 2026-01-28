import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseconfig";
import { getUserProfileImage } from "./getProfileImage";

export const getUser = async (email, password) => {
  try {
    if (!email || !password) {
      alert("Email And Password are required");
      return;
    }
    const user = await signInWithEmailAndPassword(auth, email, password);
    const uid = user.user.uid;
    const docRef = doc(db, "assignment-users", uid);
    const userDataDoc = await getDoc(docRef);
    const userData = userDataDoc.data();
    const { profileImage } = userData;
    const url = await getUserProfileImage(profileImage);
    return {
      ...userData,
      profileImage: url,
    };
  } catch (error) {
    console.log(error.code);
    alert(error.code.replace(/-/g, " "));
  }
};
