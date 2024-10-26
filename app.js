const express = require('express');
const app = express();
const todoRoutes = require('./Router/Todo.js');
const port = 3000;

app.use(express.json());

app.use('/Todo', todoRoutes);

app.set('view engine', 'ejs')
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.use((req, res) => {
    res.status(404).send(`404- halaman ora ketemu`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});