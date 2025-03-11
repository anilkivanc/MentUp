const { Sequelize } = require('sequelize');
require('dotenv').config(); // .env dosyasını yükle

// Sequelize bağlantısını oluştur
const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT || 5433,
    dialect: 'postgres',
    logging: false, // Konsolda SQL sorgularını görmek için true yapabilirsiniz
});

// Parola ve çevresel değişkenleri test etmek için log ekleyin
console.log('Parola Tipi:', typeof process.env.PG_PASSWORD); // Parola tipini gösterir
console.log('Parola Değeri:', process.env.PG_PASSWORD); // Parola değerini gösterir

// Bağlantıyı test et
sequelize.authenticate()
    .then(() => {
        console.log('PostgreSQL bağlantısı başarılı!');
    })
    .catch((err) => {
        console.error('PostgreSQL bağlantısı başarısız:', err);
    });

module.exports = sequelize;
