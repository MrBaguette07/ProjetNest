const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3003;
const SECRET = 'seapalm'; 

app.get('/introspection', (req, res) => {
    const { token } = req.query;
    if (!token || typeof token !== 'string') {
        console.log("Token is required as a query parameter.")
        return res.status(400).send({ success: false, message: 'Token is required as a query parameter.' });
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        res.status(200).send({
            success: true,
            message: 'Token is valid.',
            data: decoded
        });
    } catch (error) {
        res.status(401).send({
            success: false,
            message: 'Invalid token',
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});