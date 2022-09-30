const router = require("express").Router();
const _ = require("lodash");
let Comment = require("../models/comment.model");
const User = require("../models/user.model");

// router.route("/").get((req, res, next) => {
//   let query_param = req.query;
//   if (!_.isEmpty(query_param)) {
//     if (query_param.class_id) {
//       let clsId = query_param.class_id;
//       Comment.find({ clsId })
//         .then((comments) => res.status(200).send(comments))
//         .catch(next);
//     } else {
//       Comment.find()
//         .then((comments) => res.status(200).send(comments))
//         .catch(next);
//     }
//   } else {
//     Comment.find()
//       .then((comments) => res.status(200).send(comments))
//       .catch(next);
//   }
// });

router.get("/:id", async (req, res, next) => {
  var count = 0;
  var hix = [];
  var load = false;

  const docs = await Comment.find({ contentId: req.params.id });
  const data = docs.map(async (doc) => {
    const wo = await User.findById(doc.userId);
    if (wo)
      return {
        ...doc._doc,
        fullName: wo.fullName,
        universityId: wo.universityId,
      };
  });

  Promise.all(data).then((response) => res.status(200).send(response));

  //   res.status(200).send(data);

  //   res.status(200).send(data);
  //   Comment.find({ contentId: req.params.id })
  //     .then((comments) => {
  //       const test = comments.map((item) => {
  //         User.findById(item.userId).then((user) => {
  //           data = { ...item._doc, fullName: user.fullName };
  //         });
  //         console.log("data", data);
  //         // return data;
  //       });
  //       res.status(200).send(test);
  //     })
  //     .catch(next);

  //   comment.map(async (item) => {
  //     const user = await User.findById(item.userId);
  //     if (user) {
  //       count++;
  //     }
  //     fullName.push(user.fullName);
  //     if (count == comment.length) {
  //       comment._doc.push(fullName);
  //       res.status(200).send({ comment });
  //     }
  //   });
});

router.route("/create").post((req, res, next) => {
  console.log(req.body);
  let comment = req.body.comment;
  let clsId = req.body.clsId;
  let contentId = req.body.contentId;
  let userId = req.body.userId;
  let posted_at = req.body.posted_at || "";

  const newComment = new Comment({
    comment,
    clsId,
    contentId,
    userId,
    posted_at,
  });

  newComment
    .save()
    .then((createdComment) => res.status(200).send(createdComment))
    .catch(next);
});

router.route("/:id").get((req, res, next) => {
  Comment.findById(req.params.id)
    .then((comment) => res.status(200).send(comment))
    .catch(next);
});

router.route("/:id").delete((req, res, next) => {
  Comment.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).send("Comment deleted."))
    .catch(next);
});

module.exports = router;
