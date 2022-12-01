const router = require("express").Router();
const _ = require("lodash");
let Assignment = require("../models/assignment.model");

router.route("/").get((req, res, next) => {
  let query_param = req.query;
  if (!_.isEmpty(query_param)) {
    if (query_param.class_id) {
      let class_id = query_param.class_id;
      Assignment.find({ class_id })
        .then((assignments) => res.status(200).send(assignments))
        .catch(next);
    } else {
      Assignment.find()
        .then((assignments) => res.status(200).send(assignments))
        .catch(next);
      server / routes / assignment_responses.js;
    }
  } else {
    Assignment.find()
      .then((assignments) => res.status(200).send(assignments))
      .catch(next);
  }
});

router.route("/create").post((req, res, next) => {
  let title = req.body.title;
  let instruction = req.body.instruction;
  let assignmentFileUrl = req.body.assignmentFileUrl;
  let assignmentMarks = req.body.assignmentMarks;
  let name = req.body.name || "";
  let type = req.body.type || "";
  let startingDate = req.body.startingDate;
  let dueDate = req.body.dueDate;
  let author_id = req.body.author_id;
  let class_id = req.body.class_id;

  const newAssignment = new Assignment({
    title,
    instruction,
    assignmentFileUrl,
    assignmentMarks,
    name,
    type,
    startingDate,
    dueDate,
    author_id,
    class_id,
  });

  newAssignment
    .save()
    .then((createdAssignment) => res.status(200).send(createdAssignment))
    .catch(next);
});

router.route("/:id").get((req, res, next) => {
  Assignment.findById(req.params.id)
    .then((assignment_details) => res.status(200).send(assignment_details))
    .catch(next);
});

router.put("/update", (req, res, next) => {
  console.log(req.body);
  const {
    id,
    title,
    instruction,
    assignmentMarks,
    assignmentFileUrl,
    startingDate,
    dueDate,
  } = req.body;
  Assignment.findById(id).then((content) => {
    content.title = title;
    content.instruction = instruction;
    content.assignmentMarks = assignmentMarks;
    if (startingDate) {
      content.startingDate = startingDate;
    }
    if (dueDate) {
      content.dueDate = dueDate;
    }
    if (assignmentFileUrl.length !== 0)
      content.assignmentFileUrl = assignmentFileUrl;

    content
      .save()
      .then((updatedAssigment) => res.status(200).send(updatedAssigment))
      .catch(next);
  });
});

// router.route('/update/:id').patch((req, res, next) => {
//     Assignment.findById(req.params.id)
//         .then(assignment_details => {
//             assignment_details.quiz_questions = req.body.quiz_questions;

//             quiz_details.save()
//                 .then(updatedQuiz => res.status(200).send(updatedQuiz))
//                 .catch(next);
//         })
//         .catch(next);
// });

router.route("/:id").delete((req, res, next) => {
  Assignment.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).send("Assignment deleted."))
    .catch(next);
});

module.exports = router;
