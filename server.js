const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

//setup express app
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  // add new User
  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("New User Connected", activeUsers);
    }
    // send all active users to new user
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect", () => {
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected", activeUsers);
    // send all active users to all users
    io.emit("get-users", activeUsers);
  });

  // send message to a specific user
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log("Sending from socket to :", receiverId);
    console.log("Data: ", data);
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });
});

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

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
