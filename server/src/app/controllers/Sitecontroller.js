// Định nghĩa Controller
const { query } = require('express');
const Music = require('../model/Music');
const PAGE_SIZE = 12;
class Sitecontroller {
    index(req, res, next) {
        // Lấy ra dữ liệu model dưới dạng JSON
        // Bắn yêu cầu qua Model , lấy ra và trả dữ liệu lại dưới dạng JSON
        // methd find truyền vào một callback

        // Music.find({}, function (err, users) {
        //     if (!err) {
        //         res.json(users);
        //     } else {
        //         res.status(400).json({ error: 'message' });
        //     }
        // });

        // Dùng promise trọc vào Model lấy ra dữ liệu mang về controller
        var page = req.query.page;
        if (page) {
            // Get page
            // Chuyển sang int
            page = parseInt(page);
            // Số lượng bỏ qua
            var skipNumber = (page - 1) * PAGE_SIZE;
            Music.find({})
                .skip(skipNumber)
                // Số lượng giới hạn
                .limit(PAGE_SIZE)
                .then((musics) => {
                    // Lấy dữ liệu trong model user truyền vào home

                    //  Biến nó thành Object Literal từ Object Constructor

                    // Trọc sang view (render sang view ) truyền data lấy từ model sang view
                    // view đọc file , logic và render ra màn hình từ đó trọc về browser
                    res.json(musics);
                })
                .catch((error) => next(error));
        } else {
            Music.find({}, function (err, musics) {
                if (!err) {
                    res.send(musics);
                } else {
                    res.status(500).json({ error: 'message' });
                }
            });

            // res.render('home')
        }
    }
    // Tìm kiếm
    async search(req, res, next) {
        try {
            let productsFilm = await Music.find({}).lean();
            if (req.query.q) {
                productsFilm = productsFilm.filter((x) => x.name.toLowerCase().includes(req.query.q.toLowerCase()));
                return res.json({
                    status: 'ok',
                    data: {
                        productsFilm,
                    },
                });
            } else {
                console.log('Invalid');
            }
        } catch (err) {
            console.log(err.message);
        }
    }
}

module.exports = new Sitecontroller();
