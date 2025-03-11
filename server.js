require('dotenv').config(); // .env dosyasını yükler
const app = require('./src/app');
const PORT = process.env.PORT || 5001; // .env dosyasındaki PORT'u kullanır

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
