const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    season: {
        type: String,
        required: "you must provide season"
    },
    img_url: {
        type: String,
        required: "you must provide image url"
    },
    episodes: {
        type: Array,
        required: "you must provide episodes"
    },
    video_url: {
        type: String,
        required:' You must provide video url'
    },
    seriesId: {
        type: String,
        required: "you must provide seried Id"
    },
    created: {
        type: Date,
        required: "you must provide date created"
    }

})
module.exports = mongoose.model('seasons', schema)