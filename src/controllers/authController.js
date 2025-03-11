const { User, userProfile } = require('../models');
const bcrypt = require('bcrypt'); // bcrypt kütüphanesini ekle

// Login işlemi
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } }); // Sadece email kontrolü yap
        if (user) {
            // Şifreyi kontrol et
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                return res.status(200).json({ message: 'Giriş başarılı!', user });
            }
        }
        res.status(401).json({ message: 'Hatalı e-posta veya şifre!' });
    } catch (error) {
        console.error('Login hatası:', error);
        res.status(500).json({ message: 'Bir hata oluştu' });
    }
};

// Signup işlemi
exports.signup = async (req, res) => {
    const { name, surname, email, password } = req.body;

    try {
        console.log('Gelen Body:', req.body);

        // E-postanın daha önce kayıtlı olup olmadığını kontrol eder
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                error: 'Validation hatası',
                message: 'Bu e-posta adresi zaten kayıtlı!',
            });
        }

        // Şifreyi hashler
        const hashedPassword = await bcrypt.hash(password, 10); // 10, saltRounds değeridir

        // Kullanıcıyı oluştur
        const newUser = await User.create({ name, surname, email, password: hashedPassword });
        res.status(201).json({ message: 'Kayıt başarılı!', user: newUser });
    } catch (error) {
        console.error('Signup hatası:', error);
        res.status(500).json({ message: 'Bir hata oluştu', error: error.message });
    }
};

// Profil Yönetimi (GET ve PUT için tek endpoint)
exports.profileManagement = async (req, res) => {
    const { userId } = req.params; // Kullanıcı ID'si parametreden alınır
    const { name, surname, displayName, occupation, birthPlace, location, skills, languages } = req.body;

    try {
        if (req.method === 'GET') {
            // Profil bilgilerini getir
            const user = await User.findOne({
                where: { id: userId },
                include: [
                    {
                        model: UserProfile,
                        as: 'UserProfile', // İlişki adını modelde tanımladığınız şekilde yazın
                    },
                ],
            });

            if (!user) {
                return res.status(404).json({ message: 'Kullanıcı bulunamadı!' });
            }

            res.status(200).json(user);
        } else if (req.method === 'PUT') {
            // Kullanıcı tablosundaki bilgileri güncelle
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'Kullanıcı bulunamadı!' });
            }

            // Profil tablosunda güncelleme veya ekleme işlemi
            const [profile, created] = await UserProfile.findOrCreate({
                where: { userId },
                defaults: {
                    userId,
                    name,
                    surname,
                    displayName,
                    occupation,
                    birthPlace,
                    location,
                    skills,
                    languages,
                },
            });

            if (!created) {
                // Zaten varsa güncelle
                await profile.update({
                    name,
                    surname,
                    displayName,
                    occupation,
                    birthPlace,
                    location,
                    skills,
                    languages,
                });
            }

            res.status(200).json({ message: 'Profil başarıyla güncellendi!', profile });
        } else {
            res.status(405).json({ message: 'Bu işlem desteklenmiyor!' });
        }
    } catch (error) {
        console.error('Profil yönetimi hatası:', error);
        res.status(500).json({ message: 'Bir hata oluştu!', error: error.message });
    }
};
