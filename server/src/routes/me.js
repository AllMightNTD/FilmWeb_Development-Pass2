const express = require('express');
var router = express.Router();

// import Newcontroller từ newcontroller.js
const mecontrol = require('../app/controllers/MeController');
// import Mecontroller vào để định nghĩa tuyến đường
router.use('/storedEmloyee', mecontrol.storedemployee);

// Thùng rác : chứa những cái đã xóa
router.use('/trash', mecontrol.trashemployee);

// Lưu trữ danh sách phim

// Số lượng xóa
router.use('/deleteCount', mecontrol.DeletedCountMusic);
// Show theo thể loại
router.use('/the-loai/:category', mecontrol.showCategory);
// Show theo quốc gia
router.use('/quoc-gia/:nation', mecontrol.showNation);
// Show theo năm phát hành
router.use('/nam-phat-hanh/:year', mecontrol.showYear);
router.use('/tinh-trang/:statusMovie', mecontrol.showStatusMovie);
// export nó ra ngoài
module.exports = router;
