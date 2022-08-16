//validation
const multer = require("multer");
const multerS3 = require("multer-s3");
const uuid = require("uuid").v4;
const path = require("path");
require("dotenv").config();

const { S3Client } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: "eu-west-3",
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
});
// const validaiton = (req, file, cb) => {
//   if (req.body.name != "m100") {
//     cb(null, true);
//   } else {
//     const error = new Error("xxxxxxxxx");
//     error.status = 404;
//     cb(error);
//   }
// };

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "productsprojectimages",
    metadata: (req, file, cb) => {
      // console.log("req.body before uplaod function");
      // console.log(req.body);

      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${uuid()}${ext}`);
    },
  }),

  fileFilter: (req, file, cb) => {
    // if (req.body.name != "m100") {
    //   cb(null, true);
    // } else {
    //   const error = new Error("xxxxxxxxx");
    //   error.status = 404;
    //   cb(error);
    // }
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      const error = new Error("only png,jpg,jpeg formats allowed");
      error.status = 400;
      cb(error);
    }
  },
});

module.exports = upload;
