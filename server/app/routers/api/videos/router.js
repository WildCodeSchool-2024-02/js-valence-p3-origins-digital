const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  readByAverage,
  readComments,
  edit,
  editCategoriesByVideo,
  add,
  addRate,
  addComment,
  addFavoriteVideo,
  destroy,
  destroyComment,
  readCategories,
  destroyCategory,
  readVideosByCategories,
  readBestVideos,
} = require("../../../controllers/videoActions");

const uploadMulter = require("../../../services/multerOptions");
const uploadVideo = require("../../../services/upload");
const { verifyToken, verifyAdmin } = require("../../../services/auth");

router.get("/all", browse);

router.get("/", readVideosByCategories);

router.get("/best", readBestVideos);

router.get("/:id", read);

router.put("/:id", verifyToken, verifyAdmin, edit);

router.post("/", verifyToken, verifyAdmin, uploadMulter, uploadVideo, add);

router.delete("/:id", verifyToken, verifyAdmin, destroy);

router.post("/:id/favorites", verifyToken, addFavoriteVideo);

router.get("/:id/avgrate", readByAverage);

router.post("/rates", verifyToken, addRate);

router.get("/:id/comments", readComments);

router.post("/comments", verifyToken, addComment);

router.delete("/:videoId/comments/:id", verifyToken, destroyComment);

router.get("/:id/categories", readCategories);

router.delete(
  "/:videoId/categories/:id",
  verifyToken,
  verifyAdmin,
  destroyCategory
);

router.put(
  "/:id/categories/:id",
  verifyToken,
  verifyAdmin,
  editCategoriesByVideo
);

module.exports = router;
