// Định nghĩa Controller
const { deleteModel } = require('mongoose');
const Music = require('../model/Music');
const PAGE_SIZE = 6;
class OptionFilmController {
    // [USE] /me/:category
    // Search Value
    // Trả về kết quả tìm kiếm
    async searchResult(req, res, next) {
        const { searchValue } = req.body;

        // Không phân biệt chữ hoa chữ thường
        try {
            const searchResult = await Music.find({ name: { $regex: searchValue, $options: 'i' } });
            if (searchResult.length <= 0) {
                return res.json({
                    status: 'error',
                    error: 'Không có kết quả tìm kiếm phù hợp',
                });
            } else {
                console.log('Co du lieu');
                return res.send({
                    status: 'ok',
                    data: searchResult,
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    async showResult(req, res, next) {
        try {
            let productsFilm = await Music.find({}).lean();
            if (req.params.searchValue) {
                productsFilm = productsFilm.filter((x) =>
                    // Chuyển hết thành chữ thường
                    x.name.toLowerCase().includes(req.params.searchValue.toLowerCase()),
                );
                return res.json({
                    status: 'ok',
                    data: {
                        productsFilm,
                    },
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = new OptionFilmController();
