const Router = require("express").Router;

/**
 * Finish the route handlers to use the controllers specified
 * and assign the right endpoints for each one
 */

// use the controller for each route
const userController = require("../controllers/user-controller");

const UserRouter = Router();

//  GET `/users` Get all the users: `getUsers()` controller
UserRouter.get("/", userController.getUsers);

//  GET `/users/:userId` Get a single user by its ID: `getSingleUser()` controller
UserRouter.get("/:userId", userController.getSingleUser);

//  POST `/users` Create a user: `createUser()` controller
UserRouter.post("/", userController.createUser);

//  PATCH `/users/:userId` Update a user by its id: `updateUser()` controller
UserRouter.patch("/:userId", userController.updateUser);

//  DELETE `/users/:userId` Delete a user by its id: `deleteUser()` controller
UserRouter.delete("/:userId", userController.deleteUser);

module.exports = UserRouter;
