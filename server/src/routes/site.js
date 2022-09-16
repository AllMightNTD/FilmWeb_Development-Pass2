const express = require('express');
var router = express.Router();

// import Newcontroller từ newcontroller.js
const sitecontrol = require('../app/controllers/Sitecontroller');

// import Newcontroller vào để định nghĩa tuyến đường

// Search
router.use('/search', sitecontrol.search);

// Gọi đến hàm index
router.use('/', sitecontrol.index);
// Thùng rác

// export nó ra ngoài
module.exports = router;
