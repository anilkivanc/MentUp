const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const accountSettingsRouter = require('./routes/accountSettingsRoutes');

const app = express();

// ✅ CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// ✅ JSON body limit artırıldı
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
// app.use(bodyParser.json({ limit: '10mb' }));

// ✅ Route'lar
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/accountSettings', accountSettingsRouter);

module.exports = app;
