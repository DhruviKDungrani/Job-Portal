import multer from "multer";

// We use memoryStorage because usually we upload from here to Cloudinary
// const storage = multer.memoryStorage();


// export const multiUpload = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
// }).fields([
//   { name: "resume", maxCount: 1 },
//   { name: "profilePhoto", maxCount: 1 },
//   { name: "logo", maxCount: 1 },
//   // future files can be added here
// ]);


const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

export const multiUpload = multer({ storage }).fields([
  { name: "resume", maxCount: 1 },
  { name: "profilePhoto", maxCount: 1 },
  { name: "logo", maxCount: 1 }
]);