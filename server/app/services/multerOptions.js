const multer = require("multer");
const path = require("path");

const fileTypes = ["video/mp4", "video/webm"];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "assets", "uploads")); // Dossier où les fichiers seront enregistrés
  },
  filename: (req, file, cb) => {
    if (fileTypes.includes(file.mimetype)) {
      return cb(null, `${Date.now()}-${file.originalname}`); // Nom du fichier sauvegardé
    }
    return cb(new Error("Invalid file type."));
  },
});

const upload = multer({ storage }).single("file");

const uploadMiddleware = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Gérer les erreurs spécifiques à Multer
      res.status(400).json({ message: err.message });
    } else if (err) {
      // Gérer les autres erreurs
      res.status(400).json({
        message:
          "Invalid video type, please check the video format and try again.",
      });
    }
    // Si tout va bien, passer au middleware suivant
    next();
  });
};

module.exports = uploadMiddleware;
