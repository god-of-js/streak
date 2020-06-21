const moment = require('moment')
const DB = require('../data/db')
module.exports.weeklyRecents = (createdAt) => {
    return moment(Date.now()).subtract(7, "days")
}

module.exports.findFactory = async (sort = null, limit = null) => {
    const db = await DB();
    const result = await db
      .collection(collection)
      .sort(sort)
      .limit(limit);
    const found = await result.toArray();
    return found.map(({ _id: id, ...data }) => ({
      id,
      ...data,
    }));
  };
  module.exports.find_latest = async (query = {}) => {
    const db = await DB();
    const result = await db
      .collection(collection)
      .find(query)
      .sort({ createdAt: -1 })
      .limit(1);
    const found = await result.toArray();
    if (found.length === 0) return null;
    const { _id: id, ...data } = found[0];

    return { id, ...data };
  };