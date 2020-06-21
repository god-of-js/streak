const { id } = require('../../services/provider')
const base = require('../../base')
const movies = require('../../models/movies.js')
const {findFactory} = require('../../models/movies.js')
const store = require('../../services/cloudinary')
const c = require('../../data/collections')

module.exports.uploadMovie = async (req) => {
  const { description, date, cast , title , pg, category, type} = req.body;
  const [img, video] = req.files;
  if (!title || !cast || !img || !video || !date || !description  || !pg || !category || !type ) throw new base.ResponseError(400, "You must provide Movie, Image, Title, Cast, Date and Description ");
  if(!img.mimetype.startsWith('image')) throw new base.ResponseError(400, "Image must be of type Image")
  if(!video.mimetype.startsWith('video')) throw new base.ResponseError(400, "video must be of type Video")
  const videoId = id();
  const imgId = id();
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
    message: "Movie has been uploaded",
  });
};
module.exports.getAdminMovies = async () => {
  let moviesCollection;
  await movies.find({},(err, result) => {
    if(err) throw new base.ResponseError(400, err.message)
    else {
      moviesCollection = result
    }
  });
  return new base.Response(201, {
    error: false,
    movies: moviesCollection,
  });
}
module.exports.getRecentlyAddedMovies = async () => {
  let movieCollection;
   await movies.find().sort({createdAt: -1}).limit(10).then(response => movieCollection = response)
  return new base.Response(201, {
    error: false,
    movies: movieCollection,
  });
}
module.exports.getSingleMovie = async (req, res) => {
  const { q: searchQuery } = req.query;
  const movie =  await movies.find({_id: searchQuery}).exec()
  res.send({ ...movie })
}
