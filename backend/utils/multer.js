import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const fileFilter = function (req, file, cb) {
  if (!file.mimetype.startsWith("image/")) {
    cb(new Error("Only images are allowed"), false);
  }
  cb(null, true)
};

const upload = multer({ storage, fileFilter });

export default upload;
