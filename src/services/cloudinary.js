const cloudinary = require("cloudinary").v2;
require("dotenv").config();
module.exports = {
  upload(file, folder, name = undefined) {
    const options = {
      folder,
      resource_type: file.mimetype.split("/")[0],
    };
    if (name) options.public_id = name;
         return cloudinary.uploader
      .upload(`data:${file.mimetype};base64,${file.buffer.toString("base64")}`, options)
      .then(result => result)
      .catch(error => {
        console.error(error);
        throw error;
      });
  },
  remove(public_id) {
    return cloudinary.uploader
      .destroy(public_id)
      .then(result => result)
      .catch(error => {
        console.error(error);
        throw error;
      });
  }
};
