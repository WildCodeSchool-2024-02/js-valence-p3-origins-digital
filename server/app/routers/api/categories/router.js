const express = require("express");

const router = express.Router();

const { browse, add } = require("../../../controllers/categoryActions");

router.get("/", browse);
router.post("/", add);

module.exports = router;
