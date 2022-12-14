// Định nghĩa Controller
const { deleteModel } = require('mongoose');
const Music = require('../model/Music');
const PAGE_SIZE = 6;
class MeController {
    // List employee
    // Số dữ liệu xóa : countDocumentDeleted (count)
    // Trả về 1 object bao gồm 1 mảng và 1 count

    // [GET] /me/storedEmployee
    storedemployee(req, res, next) {
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

    // [USE] /me/deleteCount
    DeletedCountMusic(req, res, next) {
        Music.countDocumentsDeleted({}, function (err, deletedCount) {
            if (!err) {
                res.json(deletedCount);
            } else {
                res.status(500).json({ error: 'message' });
            }
        });
    }

    // [USE] /me/trash
    // Tìm danh sách đã xóa bằng findDeleted
    trashemployee(req, res, next) {
        Music.findDeleted({})
            .then((musics) => {
                // Bắn dữ liệu lên
                res.send(musics);
            })
            .catch((error) => next(error));
    }
    // [USE] /me/:category
    // showCategory
    showCategory(req, res, next) {
        var page = req.query.page;
        if (page) {
            // Get page
            // Chuyển sang int
            page = parseInt(page);
            // Số lượng bỏ qua
            var skipNumber = (page - 1) * PAGE_SIZE;
            Music.find({ category: req.params.category })
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
            Music.find({ category: req.params.category })
                .then((music) => {
                    // Gọi hàm chuyển sang Object từ handlerbar
                    res.send(music);
                })
                .catch(next);
        }
    }
    // GET /quoc-gia/:nation
    showNation(req, res, next) {
        var page = req.query.page;
        console.log(req.params.Nation);
        if (page) {
            // Get page
            // Chuyển sang int
            page = parseInt(page);
            // Số lượng bỏ qua
            var skipNumber = (page - 1) * PAGE_SIZE;
            Music.find({ Nation: req.params.nation })
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
            Music.find({ Nation: req.params.Nation })
                .then((music) => {
                    // Gọi hàm chuyển sang Object từ handlerbar
                    res.send(music);
                })
                .catch(next);
        }
    }
    // GET /nam-phat-hanh/:year
    showYear(req, res, next) {
        var page = req.query.page;
        console.log(req.params.year);
        if (page) {
            // Get page
            // Chuyển sang int
            page = parseInt(page);
            // Số lượng bỏ qua
            var skipNumber = (page - 1) * PAGE_SIZE;
            Music.find({ year: req.params.year })
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
            Music.find({ year: req.params.year })
                .then((music) => {
                    // Gọi hàm chuyển sang Object từ handlerbar
                    res.send(music);
                })
                .catch(next);
        }
    }

    // GET /tinh-trang/:statusMovie
    showStatusMovie(req, res, next) {
        var page = req.query.page;
        console.log(req.params.statusMovie);
        if (page) {
            // Get page
            // Chuyển sang int
            page = parseInt(page);
            // Số lượng bỏ qua
            var skipNumber = (page - 1) * PAGE_SIZE;
            Music.find({ statusMovie: req.params.statusMovie })
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
            Music.find({ statusMovie: req.params.statusMovie })
                .then((music) => {
                    // Gọi hàm chuyển sang Object từ handlerbar
                    res.send(music);
                })
                .catch(next);
        }
    }
}

module.exports = new MeController();
