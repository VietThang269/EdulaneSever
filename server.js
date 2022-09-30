const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

//setup express app
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully!");
});

const usersRouter = require("./routes/users");
const classesRouter = require("./routes/classes");
const enrolledClassesRouter = require("./routes/enrolled_classes");
const classContentsRouter = require("./routes/class_contents");
const commentsRouter = require("./routes/comments");
const quizzesRouter = require("./routes/quizzes");
const quizResponsesRouter = require("./routes/quiz_responses");
const assignmentsRouter = require("./routes/assignments");
const assignmentResponsesRouter = require("./routes/assignment_responses");
const chatRouter = require("./routes/chat");
const messageRouter = require("./routes/message");
const bookRouter = require("./routes/book");
const calendarRouter = require("./routes/calendar");

app.use("/users", usersRouter);
app.use("/classes", classesRouter);
app.use("/enrolled_classes", enrolledClassesRouter);
app.use("/class_contents", classContentsRouter);
app.use("/comments", commentsRouter);
app.use("/quizzes", quizzesRouter);
app.use("/quiz_responses", quizResponsesRouter);
app.use("/assignments", assignmentsRouter);
app.use("/assignment_responses", assignmentResponsesRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);
app.use("/book", bookRouter);
app.use("/calendar", calendarRouter);

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(422).send({ error: err.message });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
