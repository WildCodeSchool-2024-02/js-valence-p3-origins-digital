const fsExtra = require("fs-extra");
const path = require("path");
const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const videos = await tables.video.readAll();
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const video = await tables.video.read(req.params.id);
    if (!video) {
      res.sendStatus(404);
    }
    res.json(video);
  } catch (err) {
    next(err);
  }
};

const readByAverage = async (req, res, next) => {
  try {
    const result = await tables.video.readByAverageRate(req.params.id);
    if (!result) {
      res.sendStatus(404);
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const readComments = async (req, res, next) => {
  try {
    const result = await tables.video.readCommentsByVideo(req.params.id);
    if (!result) {
      res.sendStatus(404);
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const readCategories = async (req, res, next) => {
  try {
    const result = await tables.video.readCategoriesByVideo(req.params.id);
    if (!result) {
      res.sendStatus(404);
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const readVideosByCategories = async (req, res, next) => {
  try {
    const result = await tables.video.readAllVideosByCategories();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const readBestVideos = async (req, res, next) => {
  try {
    const result = await tables.video.readBestRatedVideos();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const video = req.body;
  const { id } = req.params;
  try {
    await tables.video.update(video, id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const editCategoriesByVideo = async (req, res, next) => {
  const data = req.body;
  const { id } = req.params;
  try {
    await tables.video.updateCategoriesByVideo(data, id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  let insertedCategoryId;
  try {
    if (
      !req.body.title ||
      !req.body.description ||
      !req.body.thumbnail ||
      req.body.isPrivate == null ||
      !req.body.source
    ) {
      res.sendStatus(400);
      return;
    }
    const insertedVideoId = await tables.video.create(req.body);
    const categoryId = await tables.category.readByName(req.body.category);

    if (!insertedVideoId || !categoryId) {
      throw new Error("couldn't get category or video id");
    } else {
      insertedCategoryId = await tables.addCategory.create(
        categoryId.id,
        insertedVideoId
      );
    }

    if (!insertedCategoryId) {
      res.sendStatus(422);
    }

    res.status(201).json({ insertedCategoryId });

    fsExtra.emptyDirSync(path.join(__dirname, "..", "assets", "uploads"));
  } catch (err) {
    next(err);
  }
};

const addRate = async (req, res, next) => {
  try {
    const rate = req.body;
    await tables.video.createRate(rate);
    res.status(201).json({ message: "votre note a été ajoutée" });
  } catch (err) {
    next(err);
  }
};

const addComment = async (req, res, next) => {
  try {
    const comment = req.body;
    if (req.body.comment.length < 6) {
      res.sendStatus(411);
    } else {
      const insertId = await tables.video.createComment(comment);
      res.status(201).json({ insertId });
    }
  } catch (err) {
    next(err);
  }
};

const addFavoriteVideo = async (req, res, next) => {
  try {
    const insertId = await tables.video.createFavorite(
      req.body.userId,
      Number(req.params.id)
    );
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.video.delete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const destroyComment = async (req, res, next) => {
  const { videoId } = req.params;
  const { id } = req.params;
  try {
    await tables.video.deleteVideoComment(videoId, id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const destroyCategory = async (req, res, next) => {
  const { videoId } = req.params;
  const { id } = req.params;
  try {
    await tables.video.deleteVideoCategory(videoId, id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  add,
  addRate,
  addComment,
  addFavoriteVideo,
  read,
  readByAverage,
  readComments,
  readCategories,
  readVideosByCategories,
  readBestVideos,
  edit,
  editCategoriesByVideo,
  destroy,
  destroyComment,
  destroyCategory,
};
