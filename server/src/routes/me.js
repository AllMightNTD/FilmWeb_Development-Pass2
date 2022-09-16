const express = require('express');
var router = express.Router();

// import Newcontroller từ newcontroller.js
const mecontrol = require('../app/controllers/MeController');

// import Mecontroller vào để định nghĩa tuyến đường

// Thùng rác : chứa những cái đã xóa
router.use('/trash', mecontrol.trashemployee);

router.use('/storedEmloyee', mecontrol.storedemployee);
// Show theo thể loại
router.use('/:category', mecontrol.showCategory);

// export nó ra ngoài
module.exports = router;
