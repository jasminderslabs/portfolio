import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebaseconfig";

export const getUserProfileImage = async (fullPath) => {
  try {
    if (!fullPath) {
      console.error("Please provide user profile path");
      return;
    }

    const storageRef = ref(storage, fullPath);
    const url = await getDownloadURL(storageRef);

    return url;
  } catch (error) {
    console.log(error);
    alert(error.code.replace(/-/g, " "));
  }
};
