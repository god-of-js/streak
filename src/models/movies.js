const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: "you must provide movie name",
        minlength: 1
    },
    image: {
        type: File,
        required: "You must provide Image",
        validate: {
            validator: (value) => {
                value
                message: "Image must be of type png or jpg"
            }
        }
    },
    video: {
        type: File,
        required: "You must provide Video",
        validate: {
            validator: (value) =>{
                message: "Video must be of type "
            }
        }
    },
    rating: {
        type: Number,
    },
    pg: {
        type: Number,
        required: "you must provide Parental Guidiance"
    },
    date: {
        type: Date,
        required: "You must provide date of production",



    }
})