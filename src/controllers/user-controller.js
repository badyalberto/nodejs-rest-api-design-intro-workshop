const db = require("../models");

async function getUsers(req, res, next) {
  try {
    const users = await db.User.find({}, { _id: 1, firstName: 1, lastName: 1 })
      .lean()
      .exec(); //lean no muestra los metodos find(no mostrar el id y la v)
    res.status(200).send({
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

async function getSingleUser(req, res, next) {
  try {
    const id = req.params["userId"];
    console.log(id);
    const user = await db.User.findOne({ _id: id }).lean().exec();
    console.log(user);
    res.status(200).send({
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const data = req.body;
    const user = await db.User.create(data);
    console.log(user);

    res.status(201).send({
      data: user._id,
    });
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const userId = req.params["userId"];
    const data = req.body;
    const userUpdated = await db.User.findByIdAndUpdate(userId, {...data})
      .lean()
      .exec(); //lean no muestra los metodos find(no mostrar el id y la v)
    res.status(204).send({
      data: userUpdated,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
    try {
      const userId = req.params["userId"];
        console.log(userId);
      const userDeleted = await db.User.findOneAndDelete(userId).lean().exec();
  
      res.status(200).send({
        data: { _id: userDeleted._id },
      });
  
    } catch (error) {
      next(error);
    }
  }

module.exports = {
  createUser: createUser,
  getUsers: getUsers,
  getSingleUser: getSingleUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
};
