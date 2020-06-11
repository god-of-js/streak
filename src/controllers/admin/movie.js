const { id } = require('../../services/provider')
const base = require('../../base')
const movies = require('../../models/movies.js')
const store = require('../../services/cloudinary')
module.exports.add = async (req, res) => {
    // const {title, img, video, date, description, pg}
}
module.exports.uploadMovie = async (req, res) => {
  const { description, date, cast , title , pg, category, type} = req.body;
  const [img, video] = req.files;
  if (!title || !cast || !img || !video || !date || !description  || !pg || !category || !type) throw new base.ResponseError(400, "You must provide Movie, Image, Title, Cast, Date and Description ");
  if(!img.mimetype.startsWith('image')) throw new base.ResponseError(400, "Image must be of type Image")
  if(!video.mimetype.startsWith('video')) throw new base.ResponseError(400, "video must be of type Video")

  const videoId = id();
  const imgId = id();
  const movie_data = video.buffer.toString("base64");
  const img_data = img.buffer.toString("base64");


    const image_url = await store.upload(
      img,
      "movie",
      imgId
    ).then((result) => result.secure_url).catch((error) => {
      console.log(error)
      throw new base.ResponseError(400, error.message);
    });
  const video_url = await store.upload(
      video,
      "movie",
      videoId
    ).then((result) => result.secure_url).catch((error) => {
      console.log(error)
      throw new base.ResponseError(400, error.message);
    });
    const movie = new movies({
        title,
        description,
        date,
        imgUrl: image_url,
        videoUrl: video_url,
        cast,
        pg,
        type,
        category,
        createdAt: Date.now()
  })
  await movie.save().catch((e) => {
    throw new base.ResponseError(400, e.message)
  })
  return new base.Response(201, {
    error: false,
    message: "Document has been added to archive",
  });
};