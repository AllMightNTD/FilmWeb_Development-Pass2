// Định nghĩa Controller
const { deleteModel } = require('mongoose');
const Music = require('../model/Music');
const PAGE_SIZE = 12;
class MeController {
    // List employee
    // Số dữ liệu xóa : countDocumentDeleted (count)
    // Trả về 1 object bao gồm 1 mảng và 1 count
    storedemployee(req, res, next) {
        Promise.all([Music.find(), Music.countDocumentsDeleted()]).then(([musics, deletedCount]) => {
            res.send({
                musics,
                deletedCount,
            });
        });
    }
    // Tìm danh sách đã xóa bằng findDeleted
    trashemployee(req, res, next) {
        Music.findDeleted({})
            .then((musics) => {
                // Bắn dữ liệu lên
                res.send(musics);
            })
            .catch((error) => next(error));
    }
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
}

module.exports = new MeController();
