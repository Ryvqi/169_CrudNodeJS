const express = require('express');
const router = express.Router();

let todos = [
    {
        id: 1, task: "Belajar Node.Js", completed: false
    },
    {
        id: 2, task: "Membuat API", completed: false
    },
];

// Endpoint untuk mendapatkan semua todos
router.get('/', (req, res) => {
    res.json(todos);
});

// Endpoint untuk membuat todo baru
router.post('/', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        task: req.body.task || 'Task tidak diberikan', // Default jika task tidak ada
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Endpoint untuk mendapatkan todo berdasarkan ID
router.get('/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Todo not found');
    res.json(todo);
});

// Endpoint untuk mengupdate todo berdasarkan ID
router.put('/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Todo not found');

    // Update properties
    todo.task = req.body.task !== undefined ? req.body.task : todo.task;
    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;

    res.json(todo);
});

// Endpoint untuk menghapus todo berdasarkan ID
router.delete('/:id', (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex === -1) return res.status(404).send('Todo not found');

    const deletedTodo = todos.splice(todoIndex, 1);
    res.json(deletedTodo);
});

module.exports = router;