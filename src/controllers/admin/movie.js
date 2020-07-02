const { id } = require('../../services/provider')
const base = require('../../base')
const movies = require('../../models/movies.js')
const series = require('../../models/series.js')
const seasons = require('../../models/seasons.js')
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
module.exports.uploadAnime = async (req) => {
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
      throw new base.ResponseError(400, error.message);
    });
  const video_url = await store.upload(
      video,
      "series",
      videoId
    ).then((result) => result.secure_url).catch((error) => {
      throw new base.ResponseError(400, error.message);
    });
  const movie = new series({
        title,
        description,
        imgUrl: image_url,
        videoUrl: video_url,
        cast,
        pg,
        category,
        createdAt: Date.now()
  })
  const savedSeries = await movie.save().catch((e) => {
    throw new base.ResponseError(400, e.message)
  })
    let season = new seasons({
        season: "1",
        img_url: image_url,
        video_url,
        episodes: [],
        seriesId: savedSeries._id,
        created: Date.now()
      })
      const savedSeason = await season.save().catch((e) => {
        throw new base.ResponseError(400, e.message)
      })
  return new base.Response(201, {
    error: false,
    message: "Series has been created",
    data: {savedSeries, savedSeason}

  });
};
module.exports.addSeason = async (req) => {
  const { cast , season, seriesId} = req.body;
  const [img, video] = req.files;
  if (!season || !cast || !img || !video || !seriesId ) throw new base.ResponseError(400, "You must provide Movie, Image, Season, Cast");
  if(!img.mimetype.startsWith('image')) throw new base.ResponseError(400, "Image must be of type Image")
  if(!video.mimetype.startsWith('video')) throw new base.ResponseError(400, "video must be of type Video")
    let seasonSearch = await seasons.find({seriesId: seriesId}).exec().catch(e => {
      throw new base.ResponseError(400, e.message)
    })
    let seasonCheck = seasonSearch.filter(x => x.season === season)
    if(seasonCheck.length !== 0) throw new base.ResponseError(400, `Season ${season} of this series already exists`)
  const videoId = id();
  const imgId = id();
    const img_url = await store.upload(
      img,
      "movie",
      imgId
    ).then((result) => result.secure_url).catch((error) => {
      throw new base.ResponseError(400, error.message);
    });
     const video_url = await store.upload(
      video,
      "movie",
      videoId
    ).then((result) => result.secure_url).catch((error) => {
      throw new base.ResponseError(400, error.message);
    })
    const newSeason = new seasons({
      season,
      img_url,
      video_url,
      created: Date.now(),
      seriesId: seriesId,
      episodes: [],
    })
    let seasonSave = await newSeason.save().catch(e => {
      throw new base.ResponseError(400, e.message)
    })
    return new base.Response(201, {
      error: false,
      message: `Season ${season} has been added`,
      data: seasonSave
    });
};
module.exports.addEpisode = async (req) => {
  const {seriesId, seasonId, episodeNumber} = req.body;
  const [img, video] = req.files;
  if(!video || !img ) throw new base.ResponseError(400, 'You must provide episode, image');
  if(!img.mimetype.startsWith('image')) throw new base.ResponseError(400, "Image must be of type Image")
  if(!video.mimetype.startsWith('video')) throw new base.ResponseError(400, "episode must be of type Video")
    let seasonSearch = await seasons.findOne({_id: seasonId}).exec().catch(e => {
      throw new base.ResponseError(400, e.message)
    })
    let presentEpisodes = seasonSearch.episodes.filter(x => x.episodeNumber === episodeNumber)
    if(presentEpisodes.length > 0)  throw new base.ResponseError(400, 'This episode exists already');
    const imgId = id();
    const videoId = id();
    const img_url = await store.upload(
      img,
      "movie",
      imgId
    ).then((result) => result.secure_url).catch((error) => {
      throw new base.ResponseError(400, error.message);
    });
    const video_url = await store.upload(
      video,
      "movie",
      videoId
    ).then((result) => result.secure_url).catch((error) => {
      throw new base.ResponseError(400, error.message);
    });
    const newEpisode = {
      img_url,
      video_url,
      seriesId,
      seasonId,
      episodeNumber,
      id: id(),
      createdAt: Date.now(),
    }
    let episodeSave = await seasons.findByIdAndUpdate({_id: seasonId}, {$push:  {"episodes": newEpisode}}).exec().catch(e => {
      throw new base.ResponseError(400, e.message)
    })
    episodeSave.episodes.push(newEpisode)
  return new base.Response(200, {
    message: 'Episode added successfully',
    data: episodeSave,
    error: false,
})
}