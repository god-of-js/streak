const base = require("../base");
module.exports = (controller) => async (request, response) => {
  try {
    const data = await controller(request);
    response.status(data.status).send(data.message);
  } catch (e) {
    if (e instanceof base.ResponseError) {
      return response.status(e.status).send({ message: e.message });
    }
    return response.status(500).send({ message: e.message });
  }
};
