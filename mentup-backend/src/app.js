const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const accountSettingsRouter = require('./routes/accountSettingsRoutes'); // accountSettingsRouter'ı dahil edin
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const applyMentorshipRoutes = require('./routes/applyMentorshipRoutes');
const adminPanelRoutes = require('./routes/adminPanelRoutes');
const path = require('path');

const app = express();

// ✅ CORS
app.use(cors({
  origin: 'http://localhost:3000', // Frontend adresiniz
  credentials: true
}));

// ✅ JSON body limit artırıldı
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Route'lar
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/accountSettings', accountSettingsRouter);
app.use('/mentor', applyMentorshipRoutes);
app.use('/admin', adminPanelRoutes);

module.exports = app;
