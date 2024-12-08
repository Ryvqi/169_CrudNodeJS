const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const port = process.env.PORT || 3000;

// Middleware dan Modul Eksternal
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');

// Routes dan Middleware Kustom
const authRoutes = require('./routes/authroutes.js');
const todoRoutes = require('./routes/tododb.js');
const { isAuthenticated } = require('./Middlewares/middleware.js');

// Database
const db = require('./database/db');

// Middleware Statis untuk File CSS, JS, dll
app.use(express.static(path.join(__dirname, 'public')));

// Middleware untuk Parsing Body Request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Konfigurasi Template Engine
app.set('views', path.join(__dirname, 'views')); // Path views
app.set('view engine', 'ejs');
app.use(expressLayouts); // Menggunakan layout EJS

// Konfigurasi Express-Session
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'defaultsecret', // Gunakan variabel environment
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false } // Set ke true jika menggunakan HTTPS
    })
);

// Routes
app.use('/', authRoutes); // Route untuk otentikasi
app.use('/todos', todoRoutes); // Route untuk todo list

// Route Halaman Utama
app.get('/', isAuthenticated, (req, res) => {
    res.render('index', { layout: 'layouts/main-layout' });
});

// Route Halaman Kontak
app.get('/contact', isAuthenticated, (req, res) => {
    res.render('contact', { layout: 'layouts/main-layout' });
});

// Route untuk Menampilkan Todo dari Database
app.get('/todo-view', (req, res) => {
    db.query('SELECT * FROM todos', (err, todos) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.render('todo', {
            layout: 'layouts/main-layout',
            todos: todos
        });
    });
});

// Middleware 404 - Halaman Tidak Ditemukan
app.use((req, res) => {
    res.status(404).send('404 - Laman ora ketemu');
});

// Jalankan Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
