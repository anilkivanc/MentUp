const { User, Profile } = require('../models');

// Kullanıcının kendi profilini getir
exports.getOwnProfile = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const user = await User.findByPk(userId, {
        attributes: ['id', 'name', 'surname', 'email', 'role'],
        include: [
          {
            model: Profile,
            as: 'profile',
            attributes: ['user_id', 'bio', 'photo_url', 'phone', 'verification_status', 'college', 'location', 'skills', 'languages'],
            required: false
          }
        ]
      });
  
      if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
  
      res.status(200).json(user);
    } catch (err) {
      console.error("🔴 Profil çekme hatası:", err);
      res.status(500).json({ message: 'Bir hata oluştu.', error: err.message });
    }
  };
  
  

// Kullanıcının kendi profilini oluştur/güncelle
exports.updateOwnProfile = async (req, res) => {
  const userId = req.user.id;
  const { bio, photo_url, phone, college, location, skills, languages } = req.body;

  try {
    const [profile, created] = await Profile.findOrCreate({
      where: { user_id: userId },
      defaults: { bio, photo_url, phone, verification_status: 'pending' , college, location, skills, languages }
    });

    if (!created) {
      await profile.update({ bio, photo_url, phone, verification_status: 'pending' , college, location, skills, languages });
    }

    res.status(200).json({
      message: created ? 'Profil oluşturuldu.' : 'Profil güncellendi.',
      profile
    });
  } catch (err) {
    console.error('🔴 Profil güncelleme hatası:', err);
    res.status(500).json({ message: 'Bir hata oluştu.', error: err.message });
  }
};