const router = require("express").Router();
const _ = require("lodash");
const verifyToken = require("../middleware/auth");
const Class = require("../models/class.model");
const ClassContent = require("../models/class_content.model");

router.get("/:id", (req, res, next) => {
  const classId = req.params.id;
  ClassContent.find({ classId })
    .then((class_contents) => res.status(200).send(class_contents))
    .catch(next);
});

router.post("/create", (req, res, next) => {
  let rawText = req.body.rawText;
  let attachedFileUrls = req.body.attachedFileUrls || "";
  let classId = req.body.classId;
  let userId = req.body.userId;
  let posted_at = req.body.posted_at || "";

  const newClassContent = new ClassContent({
    rawText,
    attachedFileUrls,
    classId,
    userId,
    posted_at,
  });

  newClassContent
    .save()
    .then((createdClassContent) => res.status(200).send(createdClassContent))
    .catch(next);
});

router.route("/:id").get((req, res, next) => {
  ClassContent.findById(req.params.id)
    .then((class_content) => res.status(200).send(class_content))
    .catch(next);
});

router.put("/update", (req, res, next) => {
  console.log(req.body);
  const { rawText, classId, id, attachedFileUrls } = req.body;
  ClassContent.findById(id).then((content) => {
    content.rawText = rawText;
    if (attachedFileUrls.length !== 0)
      content.attachedFileUrls = attachedFileUrls;

    content
      .save()
      .then((updatedLesson) => res.status(200).send(updatedLesson))
      .catch(next);
  });
});

router.route("/:id").delete((req, res, next) => {
  ClassContent.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).send("Class content deleted."))
    .catch(next);
});

module.exports = router;
