const router = require("express").Router();
const Pin = require("../models/Pin");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

console.log(process.env.API_KEY);
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

//create a pin
router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);
  try {
    const savedPin = await newPin.save();
    res.status(200).json(savedPin);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.patch("/image", upload.single("picture"), async (req, res) => {
  try {
    cloudinary.uploader.upload(req.file.path, async (error, result) => {
      if (result) {
        let picture = result.secure_url;
        res.status(200).json({ picture });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
});

//get all pins
router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find();
    res.status(200).json(pins);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
