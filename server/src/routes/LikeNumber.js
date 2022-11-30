const express = require('express');
var router = express.Router();

// import EmployeeController từ EmployeeController.js
const likeNumberController = require('../app/controllers/LikeNumberController');

// import EmployeeController vào để định nghĩa tuyến đường
router.put('/likeFilm', likeNumberController.likeFilm);
router.put('/unlikeFilm', likeNumberController.unlikeFilm);
router.put('/comment', likeNumberController.Postcomment);
// Xóa mềm (xóa ở giao diện , k xóa ở dữ liệu)
router.delete('/:idFilm/:idComment/deleteComment', likeNumberController.deleteComment);
module.exports = router;
