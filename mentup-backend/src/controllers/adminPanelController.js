const { document } = require('../models');

// adminPanelController.js
const { Document, User, Profile } = require('../models'); // Profile modelini ekledik

exports.getApplications = async (req, res) => {
  try {
    // Tüm başvuruları almak için doğru sorgu
    const applications = await Document.findAll({
      attributes: ['id', 'name', 'surname', 'email' , 'cv_url' , 'age', 'degree_number' , 'experience_years' , 'why_mentor' , 'skills', 'languages'],
      include: [
        {
          model: Profile,
          as: 'user', // Alias burada belirtiliyor
          attributes: ['photo_url'], // Profil fotoğrafını dahil ediyoruz
        },
      ],
    });
    console.log('Fetched applications:', applications);
    res.status(200).json(applications);
  } catch (err) {
    console.error('Başvurular alınamadı:', err);
    res.status(500).json({ message: 'Başvurular alınırken bir hata oluştu.' });
  }z
};


exports.getApplicationById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const application = await Document.findOne({
        where: { id },
      });
  
      if (!application) {
        return res.status(404).json({ message: 'Başvuru bulunamadı.' });
      }
  
      res.status(200).json(application);
    } catch (err) {
      console.error('Başvuru detayları alınamadı:', err);
      res.status(500).json({ message: 'Başvuru detayları alınırken bir hata oluştu.' });
    }
  };