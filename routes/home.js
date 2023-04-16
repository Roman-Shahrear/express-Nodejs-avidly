const express = require('express');
const router = express.Router();


// http get request
router.get('/', (req, res) => {
    res.send(`Welcome my avidly app ${environment} faces!..`);
});

module.exports = router;
