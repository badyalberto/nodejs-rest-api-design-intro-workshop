const db = require("../models");

async function getEditorials(req, res, next) {
  try {
    const editorials = await db.Editorial.find({}, { _id: 0, __v: 0 })
      .lean()
      .exec(); //lean no muestra los metodos find(no mostrar el id y la v)
    res.status(200).send({
      data: editorials,
    });
  } catch (error) {
    next(error);
  }
}

async function getSingleEditorial(req, res, next) {
  try {
    const id = req.params["editorialId"];
    console.log(id);
    const editorial = await db.Editorial.find({ _id: id }, { __v: 0 })
      .populate("author", ["firstName", "lastName"])
      .populate("book", ["title"])
      /* .populate({
        path: "user",
        select: { firstName: 1, lastName: 1 },
      }) */
      /*    .populate({
        path: "book",
        select: { title: 1, year: 1 },
      }) */
      .exec();
    console.log(editorial);
    res.status(200).send({
      data: editorial,
    });
  } catch (error) {
    next(error);
  }
}

async function createEditorial(req, res, next) {
  try {
    const data = req.body;
    const editorial = await db.Editorial.create(data);
    console.log(editorial);

    res.status(201).send({
      data: editorial._id,
    });
  } catch (err) {
    next(err);
  }
}

async function updateEditorial(req, res, next) {
  try {
    const editorialId = req.params["editorialId"];
    const data = req.body;
    const editorialUpdated = await db.Editorial.findByIdAndUpdate(
      editorialId,
      data,
      {
        new: true,
      },
    )
      .lean()
      .exec(); //lean no muestra los metodos find(no mostrar el id y la v)
    console.log(editorialId, data);
    res.status(201).send({
      data: editorialUpdated,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteEditorial(req, res, next) {
    try {
      const editorialId = req.params["editorialId"];
  
      const editorialDelete = await db.Editorial.findOneAndDelete(editorialId).lean().exec();
  
      res.status(200).send({
        data: { _id: editorialDelete._id },
      });
    } catch (error) {
      next(error);
    }
  }

module.exports = {
  createEditorial,
  getEditorials,
  getSingleEditorial,
  updateEditorial,
  deleteEditorial
};
