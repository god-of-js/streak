const base = require('../../base')
const movies = require('../../models/movies.js')
const series = require('../../models/series.js')
const seasons = require('../../models/seasons.js')
module.exports.getSeries = async () => {
    let moviesCollection;
    await series.find({},(err, result) => {
      if(err) throw new base.ResponseError(400, err.message)
      else {
        moviesCollection = result
      }
    });
    return new base.Response(201, {
      error: false,
      series: moviesCollection,
    });
  }
module.exports.getSingleSerie = async (req) => {
    const { q: searchQuery } = req.query;
    const serie =  await series.find({_id: searchQuery}).exec().catch(e => {
      throw new base.ResponseError(400, e.message)
    })
    const seasonCollection = await seasons.find({seriesId: searchQuery}).exec()
    return new base.Response(201, {
      error: false,
       ...serie,
       seasons: seasonCollection
    });
}
module.exports.getMovies = async () => {
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
module.exports.getRecentlyAddedSeries = async () => {
    let movieCollection;
     await series.find().sort({createdAt: -1}).limit(10).then(response => movieCollection = response)
    return new base.Response(201, {
      error: false,
      series: movieCollection,
    });
}
module.exports.getSingleMovie = async (req) => {
    const { q: searchQuery } = req.query;
    const movie =  await movies.find({_id: searchQuery}).exec().catch(e => {
      throw new base.ResponseError(400, e.message)
    })
    return new base.Response(201, {
      error: false,
       ...movie
    });
}