const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { json } = require("body-parser");

const bookRouter = require("./routes/book-routes");
const userRouter = require("./routes/user-routes");
const editorialRouter = require("./routes/editorial-routes");
//const errorMiddleware = require('')
const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(json());

app.use("/books",bookRouter);
app.use("/users",userRouter);
app.use("/editorials",editorialRouter);

module.exports = app;
