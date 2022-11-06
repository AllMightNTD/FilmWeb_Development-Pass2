const Music = require('../model/Music');
class LikeNumberController {
    likeFilm(req, res, next) {
        const id = req.body.idFilm;
        Music.findByIdAndUpdate(id, {
            $push: { likes: id },
        })
            .then((result) => res.json(result))
            .catch((err) => console.log(err));
    }
    unlikeFilm(req, res, next) {
        console.log(req.body);
    }
}
module.exports = new LikeNumberController();
