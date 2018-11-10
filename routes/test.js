// Express routes
const router = require('express').Router();

let tests = [
  {
    id: 1,
    subject: 'English',
    score: 78,
  },
  {
    id: 2,
    subject: 'Math',
    score: 98,
  },
  {
    id: 3,
    subject: 'Biology',
    score: 98,
  },
  {
    id: 4,
    subject: 'Accounting',
    score: 98,
  },
  {
    id: 5,
    subject: 'Computer Science',
    score: 98,
  },
];

router.get('/', (req, res, next) => {
  try {
    res.json(tests);
  } catch (error) {
    next(error);
  }
});

router.post('/', (req, res, next) => {
  console.log('req.params ', req.params);
  try {
    let newId = tests.length + 1;
    let newStudent = {
      id: newId,
      subject: req.body.subject,
      score: req.body.score,
    };
    tests.push(newStudent);
    res.json(tests);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', (req, res, next) => {
  try {
    //const id = req.params.id;
    let student = tests.filter(test => test.id === +req.params.id);
    res.json({ student });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', (req, res, next) => {
  try {
    const test = tests[req.params.id - 1];
    test.subject = req.body.subject;
    test.score = req.body.score;
    tests[req.params.id] = test;
    res.json({ tests });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', (req, res, next) => {
  try {
    const index = req.params.id;
    tests = tests.filter(test => {
      return test.id !== +index;
    });
    res.json(tests);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
