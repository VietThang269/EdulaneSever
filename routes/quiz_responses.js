const router = require("express").Router();
const _ = require("lodash");
let QuizResponse = require("../models/quiz_response.model");

router.route("/").get((req, res, next) => {
  let query_param = req.query;

  if (!_.isEmpty(query_param)) {
    if (query_param.user_id) {
      let user_id = query_param.user_id;
      QuizResponse.find({ user_id })
        .then((quiz_responses) => res.status(200).send(quiz_responses))
        .catch(next);
    } else if (query_param.quiz_id) {
      let quiz_id = query_param.quiz_id;
      QuizResponse.find({ quiz_id })
        .then((quiz_responses) => res.status(200).send(quiz_responses))
        .catch(next);
    } else {
      QuizResponse.find()
        .then((quiz_responses) => res.status(200).send(quiz_responses))
        .catch(next);
    }
  } else {
    QuizResponse.find()
      .then((quiz_responses) => res.status(200).send(quiz_responses))
      .catch(next);
  }
});

router.route("/create").post((req, res, next) => {
  let user_answer = req.body.user_answer;
  let total_correct = req.body.total_correct;
  let total_wrong = req.body.total_wrong;
  let scores = req.body.scores;
  let user_id = req.body.user_id;
  let quiz_id = req.body.quiz_id;

  const newQuizResponse = new QuizResponse({
    user_answer,
    total_correct,
    total_wrong,
    scores,
    user_id,
    quiz_id,
  });

  newQuizResponse
    .save()
    .then((createdQuizResponse) => res.status(200).send(createdQuizResponse))
    .catch(next);
});

router.get("/find/:userId/:quizzId", (req, res, next) => {
  console.log(req.params);
  QuizResponse.find({
    quiz_id: req.params.quizzId,
    user_id: req.params.userId,
  })
    .then((quizz_responses) => res.status(200).send(quizz_responses))
    .catch(next);
});

// router.route('/:id').get((req, res, next) => {
//     Quiz.findById(req.params.id)
//         .then(quiz_details => res.status(200).send(quiz_details))
//         .catch(next);
// });

router.route("/update/:id").patch((req, res, next) => {
  console.log(req.body);
  QuizResponse.findById(req.params.id)
    .then((quiz_response_details) => {
      quiz_response_details.user_answer = req.body.user_answer;
      quiz_response_details
        .save()
        .then((updatedQuizResponse) =>
          res.status(200).send(updatedQuizResponse)
        )
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
