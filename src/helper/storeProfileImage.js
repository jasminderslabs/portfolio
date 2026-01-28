import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebaseconfig";

export const storeProfileImage = async (email, profileImageFile) => {
  try {
    const storageRef = ref(
      storage,
      `assignment-users/${email}/profileImage/${profileImageFile.name}`,
    );

    const fullPath = await uploadBytes(storageRef, profileImageFile);

    return fullPath;
  } catch (error) {
    console.log(error.code);
    alert(error.code.replace(/-/g, ""));
  }
};
