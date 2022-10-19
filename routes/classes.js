const router = require("express").Router();
const verifyToken = require("../middleware/auth");
let Class = require("../models/class.model");
let User = require("../models/user.model");

// Done
router.get("/getAdmin/:id", (req, res, next) => {
  const user = req.params.id;
  Class.find({ user })
    .then((classes) => res.status(200).send(classes))
    .catch(next);
});

router.get("/getall", (req, res, next) => {
  Class.find()
    .then((classes) => res.status(200).send(classes))
    .catch(next);
});

// Lấy data của Class dựa vào ID của user (User đã được thêm vào Class)
router.get("/:id", async (req, res, next) => {
  let userId = req.params.id;
  console.log(userId);

  Class.find({
    "member.memberId": userId,
  })
    .then((classes) => {
      console.log(classes);
      res.status(200).send(classes);
    })
    .catch(next);
});

router.put("/add", (req, res, next) => {
  const user = req.body.user;
  const classId = req.body.classId;
  var count = 0;
  console.log(user);

  user.map((item) => {
    console.log(item);
    count++;
    Class.findOneAndUpdate(
      { _id: classId },
      {
        $push: {
          member: {
            memberId: item,
          },
        },
      },
      { new: true }
    )
      .then((classes) => console.log(classes))
      .catch(next);
  });

  console.log(count);
  if (count === user.length) {
    return res.status(200).send({ count });
  }
});

// Done
router.put("/join", async (req, res, next) => {
  let userId = req.body.userId;
  let user = await User.findById(userId);
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "User không tồn tại" });
  }

  Class.findOneAndUpdate(
    { joinCode: req.body.joinCode },
    {
      $push: {
        member: {
          memberId: userId,
        },
      },
    },
    { new: true }
  )
    .then((classes) => res.status(200).send(classes))
    .catch(next);
});

// Done
router.post("/create", (req, res, next) => {
  let className = req.body.className;
  let section = req.body.section || "testNha";
  let subject = req.body.subject || "testNha";
  let room = req.body.room || "testNha";
  let joinCode = req.body.joinCode || "testNha";
  let user = req.body.userId;

  const newClass = new Class({
    className,
    section,
    subject,
    room,
    joinCode,
    user,
  });

  newClass
    .save()
    .then((createdClass) => res.status(200).send(createdClass))
    .catch(next);
});

router.route("/get/:id").get((req, res, next) => {
  Class.findById(req.params.id)
    .then((class_details) => res.status(200).send(class_details))
    .catch(next);
});

router.route("/detail-by-class-code/:id").get((req, res, next) => {
  let joinCode = req.params.id;

  Class.findOne({ joinCode }).exec((err, class_details) => {
    if (err) {
      return res.status(400).send({ error: err.message });
    }
    return res.status(200).send(class_details);
  });
});

router.route("/:id").delete((req, res, next) => {
  Class.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).send("Class deleted."))
    .catch(next);
});

// not implemented in frontend
router.route("/update/:id").put((req, res, next) => {
  Class.findById(req.params.id)
    .then((class_details) => {
      if (req.body.className) class_details.className = req.body.className;

      if (req.body.section) class_details.section = req.body.section;

      // if (req.body.subject) class_details.subject = req.body.subject;

      // if (req.body.room) class_details.room = req.body.room;

      // if (req.body.joinCode) class_details.joinCode = req.body.joinCode;

      // if (req.body.user) class_details.user = req.body.user;

      class_details
        .save()
        .then((updatedClass) => res.status(200).send(updatedClass))
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
