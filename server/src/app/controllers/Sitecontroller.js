// Định nghĩa Controller
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
    search(req, res, next) {
        Music.find()
            .then((music) => {
                // Gọi hàm chuyển sang Object từ handlerbar
                var dataItem = music.filter((item) => {
                    item.name = item.name.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
                    item.name = item.name.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
                    item.name = item.name.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
                    item.name = item.name.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
                    item.name = item.name.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
                    item.name = item.name.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
                    item.name = item.name.replace(/đ/g, 'd');
                    item.name = item.name.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
                    item.name = item.name.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
                    item.name = item.name.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
                    item.name = item.name.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
                    item.name = item.name.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
                    item.name = item.name.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
                    item.name = item.name.replace(/Đ/g, 'D');
                    // Some system encode vietnamese combining accent as individual utf-8 characters
                    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
                    item.name = item.name.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
                    item.name = item.name.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
                    // Remove extra spaces
                    // Bỏ các khoảng trắng liền nhau
                    item.name = item.name.replace(/ + /g, ' ');
                    item.name = item.name.trim();
                    // Remove punctuations
                    // Bỏ dấu câu, kí tự đặc biệt
                    item.name = item.name.replace(
                        /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
                        ' ',
                    );
                    return item.name.toLowerCase().includes(req.query.q.toLowerCase());
                });
                res.json(dataItem);
            })
            .catch(next);
    }
}

module.exports = new Sitecontroller();
