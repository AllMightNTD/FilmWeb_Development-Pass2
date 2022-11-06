const Music = require('../model/Music');
class LikeNumberController {
    // Xử lí like film
    // Push vào mảng và tính số lượng
    // Cập nhật theo PostedBy : id của người đăng nhập
    // Mỗi bài viết có 1 id của người đăng nhập
    async likeFilm(req, res, next) {
        console.log(req.body);
        const id = req.body.id;
        try {
            await Music.findByIdAndUpdate(
                id,
                {
                    $push: { likes: req.body.idFilm },
                },
                {
                    new: true,
                },
            ).exec((err, result) => {
                if (err) {
                    return res.status(422).json({ error: err });
                } else {
                    console.log(result);
                    res.json(result);
                }
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    // Xử lí unlike film
    async unlikeFilm(req, res, next) {
        try {
            console.log(req.body);
            const id = req.body.id;
            await Music.findByIdAndUpdate(
                id,
                {
                    $pull: { likes: req.body.idFilm },
                },
                {
                    new: true,
                },
            ).exec((err, result) => {
                if (err) {
                    return res.status(422).json({ error: err });
                } else {
                    console.log(result);
                    res.json(result);
                }
            });
        } catch (err) {
            console.log(err.message);
        }
    }
}
module.exports = new LikeNumberController();
