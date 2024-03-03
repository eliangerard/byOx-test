const express = require('express');
const path = require('path');

const app = express();

// Sirve los archivos estáticos de la carpeta dist en la raíz
app.use('/', express.static(path.join("../", 'dist')));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});