const express = require('express');
const router = express.Router();
const multer = require('multer');
const { registerUser, loginUser, addPolitician, getPoliticians, searchPoliticians, politicianProfile,politicianReviews, ratePolitician } = require('./controllers');


router.get('/politicianReviews/:id', politicianReviews);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/'); // Set the destination folder for uploaded images
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit, adjust as needed
});

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/addPolitician', upload.single('image'), addPolitician);
router.get('/politicians', getPoliticians);
router.get('/searchPoliticians', searchPoliticians);
router.get('/politicianProfile/:id', politicianProfile);
router.get('/getPoliticians', getPoliticians);
router.post('/ratePolitician', ratePolitician);

module.exports = router;
