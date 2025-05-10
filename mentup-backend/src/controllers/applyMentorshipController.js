const { Document, User } = require('../models');

exports.createMentorApplication = async (req, res) => {
  const userId = req.user.id;
  const { name, surname, age, degree_number, experience_years, why_mentor, skills, languages  } = req.body;
  const cvFile = req.file;

  if (!cvFile) {
    return res.status(400).json({ message: 'CV dosyası gereklidir.' });
  }

  try {
    // Kullanıcıyı veritabanından getir
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    // Kullanıcı adını ve soyadını kontrol et
    if (user.name !== name) {
      return res.status(400).json({ message: `İsim uyuşmuyor. Giriş yaptığınız isim: ${user.name}` });
    }
    if (user.surname !== surname) {
      return res.status(400).json({ message: `Soyisim uyuşmuyor. Giriş yaptığınız soyisim: ${user.surname}` });
    }

    // Kullanıcının daha önce başvuru yapıp yapmadığını kontrol et
    const existingApplication = await Document.findOne({
      where: {
        user_id: userId,
        type: 'mentor_application'
      }
    });

    if (existingApplication) {
      return res.status(400).json({
        message: 'Zaten bir mentor başvurunuz bulunmaktadır. Birden fazla başvuru yapamazsınız.'
      });
    }

    // Dosya URL'ini oluştur
    const cvUrl = `${req.protocol}://${req.get('host')}/uploads/${cvFile.filename}`;

    // Başvuruyu kaydet
    const document = await Document.create({
      user_id: userId,
      name,
      surname,
      cv_url: cvUrl,
      age,
      degree_number,
      experience_years,
      why_mentor,
      skills,
      languages,
      type: 'mentor_application',
    });

    res.status(201).json({ message: 'Başvuru başarıyla oluşturuldu.', document });
  } catch (err) {
    console.error('Başvuru kaydedilemedi:', err);
    res.status(500).json({ message: 'Bir hata oluştu.', error: err.message });
  }
};

exports.checkApplicationStatus = async (req, res) => {
  const userId = req.user.id;

  try {
    const existingApplication = await Document.findOne({
      where: {
        user_id: userId,
        type: 'mentor_application'
      }
    });

    if (existingApplication) {
      return res.status(200).json({ hasApplied: true });
    }

    res.status(200).json({ hasApplied: false });
  } catch (err) {
    console.error('Başvuru durumu kontrol edilemedi:', err);
    res.status(500).json({ message: 'Bir hata oluştu.', error: err.message });
  }
};