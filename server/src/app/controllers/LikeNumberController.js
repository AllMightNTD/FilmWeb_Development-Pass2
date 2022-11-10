const Music = require('../model/Music');
class LikeNumberController {
    // Xử lí like film
    // Push vào mảng và tính số lượng
    // Cập nhật theo PostedBy : id của người đăng nhập
    // Mỗi bài viết có 1 id của người đăng nhập
    async likeFilm(req, res, next) {
        console.log(req.body);
        const idFilm = req.body.idFilm;
        try {
            await Music.findByIdAndUpdate(
                idFilm,
                {
                    $push: { likes: req.body.idUser },
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
            const idFilm = req.body.idFilm;
            await Music.findByIdAndUpdate(
                idFilm,
                {
                    $pull: { likes: req.body.idUser },
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

    // [POST] /likenumber/comment
    async Postcomment(req, res, next) {
        const { text, postedBy, nameUser } = req.body;
        const idFilmsss = req.body.idFilm;
        console.log(idFilmsss);
        console.log(req.body);
        const comment = {
            text,
            nameUser,
            postedBy,
        };
        console.log(comment);
        try {
            await Music.findByIdAndUpdate(
                idFilmsss,
                {
                    $push: { comments: comment },
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
        } catch (error) {
            console.log(error.message);
        }
    }
}
module.exports = new LikeNumberController();
