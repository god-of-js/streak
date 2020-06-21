const mongoose = require('mongoose')
// const DB = require('../data/db')
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: "you must provide movie name",
        minlength: 1
    },
    description: {
        type: String,
        required: "You must provide description",
        minlength: 1    
    },
    date: {
        type: Date,
        required: "You must provide date of production",
    },
    cast: {
        type: String,
        required: "You must provide cast",
    },
    imgUrl: {
        type: String,
        required: "No Image Url"
    },
    videoUrl:  {
        type: String,
        required: "No Video Url"
    },
    createdAt: {
        type: Date,
    },
    pg: {
        type: Number,
        required: "you must provide Parental Guidiance"
    },
    type: {
        type: String,
        required: 'You must provide type of movie',
         validate: {
        validator: (value) => /^(series|single)$/.test(value),
        message:
          "Invalid Movie type",
      },
    },
    category: {
        type: Array,
        required: "You must provide category"
    }
})
module.exports = mongoose.model("movies", schema);
module.exports.findFactory = async (sort = null, limit = null) => {
    const db = schema;
    const result = await db.sort(sort).limit(limit);
    console.log('entered')
      console.log(result)
    const found = await result.toArray();
    return found.map(({ _id: id, ...data }) => ({
      id,
      ...data,
    }));
  };