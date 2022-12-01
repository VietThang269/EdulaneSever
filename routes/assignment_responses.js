const router = require("express").Router();
const _ = require("lodash");
let AssignmentResponse = require("../models/assignment_response.model");

router.route("/").get((req, res, next) => {
  let query_param = req.query;

  if (!_.isEmpty(query_param)) {
    if (query_param.user_id) {
      let user_id = query_param.user_id;
      AssignmentResponse.findOne({ user_id })
        .then((assignment_responses) =>
          res.status(200).send(assignment_responses)
        )
        .catch(next);
    } else if (query_param.assignment_id) {
      let assignment_id = query_param.assignment_id;
      AssignmentResponse.find({ assignment_id })
        .then((assignment_responses) =>
          res.status(200).send(assignment_responses)
        )
        .catch(next);
    } else if (query_param.assignment_response_id) {
      let assignment_response_id = query_param.assignment_response_id;
      AssignmentResponse.findById(assignment_response_id)
        .then((assignment_responses) =>
          res.status(200).send(assignment_responses)
        )
        .catch(next);
    } else {
      AssignmentResponse.find()
        .then((assignment_responses) =>
          res.status(200).send(assignment_responses)
        )
        .catch(next);
    }
  } else {
    AssignmentResponse.find()
      .then((assignment_responses) =>
        res.status(200).send(assignment_responses)
      )
      .catch(next);
  }
});

router.route("/create").post((req, res, next) => {
  console.log(req.body);
  let rawText = req.body.rawText;
  let assignmentFileUrl = req.body.assignmentFileUrl;
  let marks = req.body.marks || "";
  let name = req.body.name || "";
  let type = req.body.type || "";
  let user_id = req.body.user_id;
  let assignment_id = req.body.assignment_id;
  let updateAt = req.body.updateAt;

  const newAssignmentResponse = new AssignmentResponse({
    rawText,
    assignmentFileUrl,
    marks,
    name,
    type,
    user_id,
    assignment_id,
    updateAt,
  });

  newAssignmentResponse
    .save()
    .then((createdAssignmentResponse) =>
      res.status(200).send(createdAssignmentResponse)
    )
    .catch(next);
});

router.get("/find/:userId/:resId", (req, res, next) => {
  console.log(req.params);
  AssignmentResponse.findOne({
    assignment_id: req.params.resId,
    user_id: req.params.userId,
  })
    .then((assignment_responses) => res.status(200).send(assignment_responses))
    .catch(next);
});

// router.route('/:id').get((req, res, next) => {
//     Quiz.findById(req.params.id)
//         .then(quiz_details => res.status(200).send(quiz_details))
//         .catch(next);
// });

router.route("/update/:id").put((req, res, next) => {
  console.log(req.body);
  AssignmentResponse.findById(req.params.id)
    .then((assignment_response_details) => {
      if (req.body.marks) assignment_response_details.marks = req.body.marks;
      assignment_response_details.rawText = req.body.rawText;
      assignment_response_details.assignmentFileUrl =
        req.body.assignmentFileUrl;
      assignment_response_details
        .save()
        .then((updatedAssignmentResponse) =>
          res.status(200).send(updatedAssignmentResponse)
        )
        .catch(next);
    })
    .catch(next);
});

router.route("/update").put((req, res, next) => {
  console.log(req.body);
  AssignmentResponse.findOne({
    userId: req.body.user_id,
    assignment_id: req.body.assignment_id,
  })
    .then((assignment_response_details) => {
      if (req.body.marks) assignment_response_details.marks = req.body.marks;
      if (req.body.rawText)
        assignment_response_details.rawText = req.body.rawText;
      if (req.body.assignmentFileUrl)
        assignment_response_details.assignmentFileUrl =
          req.body.assignmentFileUrl;
      assignment_response_details
        .save()
        .then((updatedAssignmentResponse) =>
          res.status(200).send(updatedAssignmentResponse)
        )
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
