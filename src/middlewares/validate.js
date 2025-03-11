module.exports = (schema) => {
    return (req, res, next) => {
        console.log('Gelen Body:', req.body); // Gelen isteği logla
        console.log('Gelen Schema:', schema); // Gelen şemayı logla

        if (!schema || typeof schema.validate !== 'function') {
            return res.status(500).json({ message: 'Geçersiz şema nesnesi veya validate fonksiyonu eksik.' });
        }

        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                error: "Validation hatası",
                details: error.details.map((err) => err.message),
            });
        }
        next();
    };
};
