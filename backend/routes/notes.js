const express = require('express');
const router = express.Router();
const {
    getNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote,
    
    getTasks,
    addTask,
    updateTask,
    deleteTask,
    deleteAllTasks
} = require('../controllers/noteController');


router.get('/', getNotes);

router.get('/:id', getNote);

router.post('/', createNote);

router.put('/:id', updateNote);

router.delete('/:id', deleteNote);


router.get('/:id/tasks', getTasks);

router.post('/:id/tasks', addTask);

router.put('/:id/tasks/:taskIndex', updateTask);

router.delete('/:id/tasks/:taskIndex', deleteTask);

router.delete('/:id/tasks', deleteAllTasks);

module.exports = router;