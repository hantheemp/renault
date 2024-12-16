const express = require("express");
const multer = require("multer");
const path = require("path");
const { convertExcelToJson } = require("./excel");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../data"));
    },
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only .xlsx files are allowed"), false);
    }
  },
});

const fileUpload = (req, res) => {
  upload.single("file")(req, res, (error) => {
    if (error) {
      console.error("File upload error:", err);
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (convertExcelToJson()) {
      res.status(200).json({
        success: true,
        message: "File uploaded successfully",
        filename: req.file.filename,
      });
    } else {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });
};

module.exports = {
  fileUpload,
};
