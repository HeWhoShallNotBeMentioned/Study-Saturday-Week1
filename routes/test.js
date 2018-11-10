// Express routes
const router = require('express').Router();
const { students, tests } = require('../db/db');

// Get Tests
router.get('/', function(req, res, next) {
  res.json(tests);
});

//Top Score
router.get('/top', (req, res, next) => {
  try {
    let topScore = tests.reduce((prev, current, idx) => {
      return prev.score > current.score ? prev : current;
    });
    console.log('topScore ', topScore);

    let topStudent = students.filter(student => {
      return student.id === +topScore.studentId;
    });
    console.log('topStudent ', topStudent);

    res.json({ topStudent });
  } catch (error) {
    next(error);
  }
});

// Get Test by Id
router.get('/:id', function(req, res, next) {
  let test = tests.filter(test => test.id === +req.params.id);
  res.json(test);
});

//Get mean score for student
router.get('/:id/mean', function(req, res, next) {
  let studentTests = tests.filter(test => test.studentId === +req.params.id);
  let total = studentTests.reduce((acc, test, idx) => {
    return acc + test.score;
  }, 0);
  let mean = total / studentTests.length + 1;
  res.json({ mean });
});

// Add Score
router.post('/', function(req, res, next) {
  let newId = tests.length;
  let test = {
    id: newId,
    score: req.body.score,
    studentId: req.body.studentId,
    subject: req.body.subject,
  };
  tests.push(test);
  res.json(tests);
});

// Delete Score
router.delete('/:id', function(req, res, next) {
  let newScores = tests.filter(score => score.id !== +req.params.id);
  let tests = newScores;
  res.json(tests);
});

// Update Score
router.put('/:id', function(req, res, next) {
  tests.map(score => {
    if (score.id === +req.params.id) {
      score.score = req.body.score;
      score.studentId = req.body.studentId;
      score.subject = req.body.subject;
    }
  });
  res.json(tests);
});

// // Get Test by Id
// router.get('/:id', function(req, res, next) {
//   let test = tests.filter(test => test.id === +req.params.id);
//   res.json(test);
//});

module.exports = router;
