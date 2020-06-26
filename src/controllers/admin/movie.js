const { id } = require('../../services/provider')
const base = require('../../base')
const movies = require('../../models/movies.js')
const series = require('../../models/series.js')
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
module.exports.uploadSeries = async (req) => {
  const { description, date, cast , title , pg, category} = req.body;
  const [img, video] = req.files;
  if (!title || !cast || !img || !video || !description  || !pg || !category ) throw new base.ResponseError(400, "You must provide Movie, Image, Title, Cast, Date and Description ");
  if(!img.mimetype.startsWith('image')) throw new base.ResponseError(400, "Image must be of type Image")
  if(!video.mimetype.startsWith('video')) throw new base.ResponseError(400, "video must be of type Video")
  const serie = await series.find({title: title}).exec()
  if(serie.length !== 0)  throw new base.ResponseError(400, "This series already exists and can only be updated")
  const videoId = id();
  const imgId = id();
    const image_url = await store.upload(
      img,
      "series",
      imgId
    ).then((result) => result.secure_url).catch((error) => {
      console.log(error)
      throw new base.ResponseError(400, error.message);
    });
  const video_url = await store.upload(
      video,
      "series",
      videoId
    ).then((result) => result.secure_url).catch((error) => {
      throw new base.ResponseError(400, error.message);
    });
    let seasons = [{
        season: "1",
        img_url: image_url,
        video_url,
        _id: id(),
        created: Date.now()
      }]
    const movie = new series({
        title,
        description,
        imgUrl: image_url,
        videoUrl: video_url,
        cast,
        pg,
        seasons,
        category,
        createdAt: Date.now()
  })
  const savedSeries = await movie.save().catch((e) => {
    throw new base.ResponseError(400, e.message)
  })
  return new base.Response(201, {
    error: false,
    message: "Series has been created",
    data: savedSeries

  });
};
module.exports.addSeason = async (req) => {
  const { cast , season, movieId} = req.body;
  const [img, video] = req.files;
  if (!season || !cast || !img || !video || !movieId ) throw new base.ResponseError(400, "You must provide Movie, Image, Season, Cast");
  if(!img.mimetype.startsWith('image')) throw new base.ResponseError(400, "Image must be of type Image")
  if(!video.mimetype.startsWith('video')) throw new base.ResponseError(400, "video must be of type Video")
  const videoId = id();
  const imgId = id();
    const image_url = await store.upload(
      img,
      "movie",
      imgId
    ).then((result) => result.secure_url).catch((error) => {
      console.log(error, 'error')
      throw new base.ResponseError(400, error.message);
    });
  const video_url = await store.upload(
      video,
      "movie",
      videoId
    ).then((result) => result.secure_url).catch((error) => {
      console.log('from here')
      throw new base.ResponseError(400, error.message);
    });
    console.log('no')
    const newSeason = {
      season,
      image_url,
      video_url,
      id: id(),
      created: Date.now(),
      movieId
    }
    let seasonSearch = await series.findByIdAndUpdate({_id: movieId}, {$push:  {"seasons": newSeason}}).exec().catch(() => {
      throw new base.ResponseError(400, "Image must be of type Image")
    })
    return new base.Response(201, {
      error: false,
      message: `Season ${newSeason.season} has been added to the series ${seasonSearch.title}`,
      data: seasonSearch
    });
};
module.exports.addEpisode = async (req) => {
  const {episode, image, shortClip} = req.body
}