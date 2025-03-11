const sequelize = require('../config/database');
const User = require('./User'); // Modeli içeri aktar

// Veritabanı ile modelleri senkronize et
sequelize.sync({ alter: true }) // `force: true` tabloyu sıfırlar, dikkatli kullanın
    .then(() => {
        console.log('Tüm modeller başarıyla senkronize edildi!');
    })
    .catch((err) => {
        console.error('Model senkronizasyon hatası:', err);
    });

module.exports = {
    User,
    sequelize,
};

