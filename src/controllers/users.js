module.exports.list = (request, response) => {
    response.status(200).send([
        {name: "Benjamin"},
        {name: "Henry"},
    ])
}