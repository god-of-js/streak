const DB = require('./db.js');
import {id} from require('../services/provider.js')

module.exports = (collection) => {
    const insert = async ({id = id(), ...data}) => {
        const db = DB()
        const record = {
            id,
            created: Date.now(),
            ...data
        }
         db.collection(collection).insertOne(record)
    }
}