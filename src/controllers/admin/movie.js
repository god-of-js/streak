const app = express()
const io = require('socket.io').listen(app)

module.exports.upload = async (req, res) => {
    const {title, img, video, date, description, pg}
}