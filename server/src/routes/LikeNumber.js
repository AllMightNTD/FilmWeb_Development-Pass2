const express = require('express');
var router = express.Router();

// import EmployeeController từ EmployeeController.js
const likeNumberController = require('../app/controllers/LikeNumberController');

// import EmployeeController vào để định nghĩa tuyến đường
router.put('/likeFilm', likeNumberController.likeFilm);
router.put('/unlikeFilm', likeNumberController.unlikeFilm);
module.exports = router;
