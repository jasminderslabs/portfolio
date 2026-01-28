import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebaseconfig";

export const storeCoverImage = async (email, coverImage) => {
  try {
    const storageRef = ref(
      storage,
      `assignment-users/${email}/cover-images/${coverImage.name}`,
    );

    const fullPath = await uploadBytes(storageRef, coverImage);
    return fullPath.metadata.fullPath;
  } catch (error) {
    console.log(error);
    alert(error.code.replace(/-/g, ""));
  }
};
