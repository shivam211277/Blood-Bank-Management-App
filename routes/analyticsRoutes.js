const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  bloodGroupDetailController,
} = require("../controllers/analyticsController");

const router = express.Router();

//routes

//Get blood data
router.get("/bloodGroups-data", authMiddleware, bloodGroupDetailController);

module.exports = router;
