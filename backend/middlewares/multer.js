
import multer from "multer";

const storage = multer.memoryStorage(); // Not disk
export const upload = multer({ storage });
