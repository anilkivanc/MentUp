const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes'); // ✅ Profile route'u ekledik

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes); // ✅ Profile endpoint'i tanıtıldı

module.exports = app;
