const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import user-related actions
const {
  browse,
  read,
  readFavorites,
  readComments,
  readRates,
  readRateOfOneVideo,
  add,
  destroy,
  destroyFavorite,
  destroyComment,
} = require("../../../controllers/userActions");

const { hashPassword } = require("../../../services/auth");
const { verifyToken, verifyAdmin } = require("../../../services/auth");

router.get("/", verifyToken, verifyAdmin, browse);

router.get("/:id", verifyToken, verifyAdmin, read);

router.post("/", hashPassword, add);

router.delete("/:id", verifyToken, verifyAdmin, destroy);

router.get("/:id/favorites", verifyToken, readFavorites);

router.get("/:id/comments", verifyToken, readComments);

router.get("/:id/rates", verifyToken, readRates);

router.get("/:id/videos/:videoId/rate", verifyToken, readRateOfOneVideo);

router.delete("/:userId/favorites/:id", verifyToken, destroyFavorite);

router.delete("/:userId/comments/:id", verifyToken, destroyComment);

module.exports = router;
