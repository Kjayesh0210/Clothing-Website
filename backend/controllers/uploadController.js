const cloudinary = require("../config/cloudinary");

const streamifier = require("streamifier");

const uploadImage = async (req, res) => {
  try {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "products",
      },
      (error, result) => {
        if (error) {
          console.log("CLOUDINARY ERROR:");

          console.log(error);

          return res.status(500).json({
            message: error.message,
          });
        }

        res.json({
          url: result.secure_url,
        });
      },
    );

    streamifier.createReadStream(req.file.buffer).pipe(stream);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  uploadImage,
};
