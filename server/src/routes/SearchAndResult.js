const express = require('express');
var router = express.Router();

// import Newcontroller từ newcontroller.js
const OptionFilmControll = require('../app/controllers/OptionFilmController');
// giá trị tìm kiếm
router.post('/:searchresult', OptionFilmControll.searchResult);
// Kết quả tìm kiếm
router.use('/:searchValue', OptionFilmControll.showResult);

// export nó ra ngoài
module.exports = router;
