const bcrypt = require('bcrypt');
const { User } = require('../models');

// Mevcut şifreyi kontrol etme
exports.checkCurrentPassword = async (req, res) => {
  const { currentPassword } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    // Şifreyi karşılaştır
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mevcut şifre yanlış.' });
    }

    return res.status(200).json({ isValid: true });
  } catch (err) {
    console.error("Şifre doğrulama hatası:", err);
    return res.status(500).json({ message: 'Sunucuda bir hata oluştu.' });
  }
};

// E-posta bilgisini al
exports.getOwnEmail = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId, {
      attributes: ['id', 'email'],
    });

    if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });

    res.status(200).json(user);
  } catch (err) {
    console.error("E-posta verisi alınamadı:", err);
    res.status(500).json({ message: 'Bir hata oluştu.', error: err.message });
  }
};

// Şifreyi güncelleme
exports.updateOwnPassword = async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword, confirmPassword } = req.body;

  // Yeni şifre ve tekrarı eşleşiyor mu?
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'Yeni şifreler eşleşmiyor.' });
  }

  try {
    // Kullanıcıyı çek
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    // Mevcut şifre doğru mu?
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mevcut şifre yanlış.' });
    }

    // Yeni şifreyi hash’leyip kaydet
    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    return res.status(200).json({ message: 'Şifre başarıyla güncellendi.' });
  } catch (err) {
    console.error('🔴 Şifre güncelleme hatası:', err);
    return res.status(500).json({ message: 'Sunucuda bir hata oluştu.' });
  }
};
