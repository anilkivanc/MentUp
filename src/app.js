const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Auth ile ilgili route'ları ekler

const app = express();

app.use(express.json()); // JSON gövdesini parse eder
app.use(express.urlencoded({ extended: true })); // URL-encoded verileri parse eder


app.use(cors()); // CORS izinlerini ayarla
app.use(bodyParser.json()); // Gelen JSON verisini parse et

// Route'ları bağla
app.use('/auth', authRoutes); // "/auth" altında authRoutes kullan

module.exports = app;
