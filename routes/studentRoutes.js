const express = require('express');
const router = express.Router();
const students = require('./../students'); //data

router.get('/', (req, res, next) => {
  try {
    res.send(students);
  } catch (error) {
    next(error);
  }
});

router.post('/', (req, res, next) => {
  try {
    let index = students.length;
    let student = {};
    student.id = index;
    student.name = req.body.name;
    students.push(student);
    res.send(students);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', (req, res, next) => {
  try {
    const index = req.params.id;
    students.splice(index - 1, 1);
    res.send(students);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', (req, res, next) => {
  try {
    let id = req.params.id;
    let name = req.body.name;
    students[id].name = name;
    res.send(students);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', (req, res, next) => {
  try {
    res.send(students[req.params.id]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
