// import multer from 'multer';
// const storage = multer.memoryStorage()

// // Single Upload
// export const singleUpload = multer({storage}).single('file')

// // Multiple Upload
// export const multiUpload = multer({storage}).array("files", 5);


import multer from "multer";

const storage = multer.memoryStorage();

const limits = {
  fileSize: 5 * 1024 * 1024, // 5MB
};

export const singleUpload = multer({
  storage,
  limits,
}).single("file");

export const multiUpload = multer({
  storage,
  limits,
}).array("files", 5);