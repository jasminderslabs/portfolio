import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebaseconfig";

export const getCoverImage = async (fullPath) => {
  try {
    const storageRef = ref(storage, fullPath);
    const url = await getDownloadURL(storageRef);

    return url;
  } catch (error) {
    console.log(error);
    alert(error.code.replace(/-/g, " "));
  }
};
