const router = require("express").Router();
let User = require("../models/user.model");
let jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const verifyToken = require("../middleware/auth");

router.get("/getall/:id", (req, res, next) => {
  User.find({ _id: { $not: { $eq: req.params.id } } })
    .then((users) => res.status(200).send(users))
    .catch(next);
});

router.post("/signup", async (req, res, next) => {
  const userName = req.body.userName;
  const fullName = req.body.fullName ? req.body.fullName : "";
  const universityId = req.body.universityId ? req.body.universityId : "";
  const isTeacher = req.body.isTeacher;
  const password = req.body.password;

  const hashedPassword = await argon2.hash(password);

  const newUser = new User({
    fullName,
    userName,
    universityId,
    isTeacher,
    password: hashedPassword,
  });

  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_ACC_ACTIVATE);

  newUser
    .save()
    .then((newUser) => {
      const { password, ...info } = newUser._doc;
      res.status(201).send({ ...info, token });
    })

    .catch(next);
});

router.post("/signin", async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });

    if (user !== null) {
      const passwordValid = await argon2.verify(
        user.password,
        req.body.password
      );

      if (!passwordValid)
        return res
          .status(400)
          .json({ success: false, message: "Incorrect username or password" });

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_ACC_ACTIVATE
      );
      const { password, ...info } = user._doc;
      return res.status(200).send({ ...info, token });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.route("/:id").get((req, res, next) => {
  User.findById(req.params.id)
    .then((user) => res.status(200).send(user))
    .catch(next);
});

router.route("/").get((req, res, next) => {
  User.find()
    .then((user) => res.status(200).send(user))
    .catch(next);
});

router.route("/:id").delete((req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).send("User deleted."))
    .catch(next);
});

router.route("/update/:id").patch((req, res, next) => {
  console.log("update profile > ", req.body);
  User.findById(req.params.id)
    .then((user) => {
      user.fullName = req.body.fullName ? req.body.fullName : user.fullName;
      user.universityId = req.body.universityId
        ? req.body.universityId
        : user.universityId;
      user.mobileNo = req.body.mobileNo ? req.body.mobileNo : user.mobileNo;

      user
        .save()
        .then((udpatedUser) => res.status(200).send(udpatedUser))
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
