const {id} = require('../../services/provider')
const base = require('../../base')
module.exports.add = async (req, res) => {
    // const {title, img, video, date, description, pg}
}
module.exports.upload = async (req, res) => {
  const { description,date,cast , title, image , video  } = req.body;
  //  return new base.Response(201, {
  //   error: false,
  //   message: "Video has been Uploaded",
  //   data: video.mimetype,
  //   body: req.body
  // })
  if (!title || !video || !image || !cast || !date || !description ) throw new base.ResponseError(400, "You must provide Title, Video, Image, Cast, Date and Description ");
  const video_id = Id();
  if (doc.mimetype != "application/pdf")
    throw new ResponseError(400, "You must provide only pdf files");
  const file_data = doc.buffer.toString("base64");
  let result;
  try {
    result = await store
      .upload(
        `data:${doc.mimetype};base64,${file_data}`,
        "vendor_requirements",
        undefined,
        doc_id
      )
      .then((result) => result.secure_url);
  } catch (error) {
    throw new ResponseError(400, error.message);
  }
  await c.archives.insert({ _id: doc_id, owner: id, name, link: result });

  return new Response(201, {
    error: false,
    message: "Document has been added to archive",
  });
};