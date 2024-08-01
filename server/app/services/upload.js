const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const options = {
  use_filename: false,
  unique_filename: true,
  overwrite: true,
  resource_type: "video",
};

const upload = async (req, res, next) => {
  try {
    if (!req.file) {
      res.sendStatus(404);
      return;
    }
    const uploaded = await cloudinary.uploader.upload(req.file.path, options);
    if (uploaded) {
      const url = `${uploaded.url.substring(0, uploaded.url.length - 3)}jpg`;
      req.body.thumbnail = url;
      req.body.source = uploaded.url;
      if (req.body.isPrivate === "private") {
        req.body.isPrivate = true;
      } else {
        req.body.isPrivate = false;
      }
      next();
    } else {
      throw new Error("Error while uploading video to cloudinary");
    }
  } catch (err) {
    next(err);
  }
};

module.exports = upload;
