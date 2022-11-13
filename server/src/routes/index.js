// import newRouter từ ngoài vào
const siteRouter = require('./site');
// Lấy newRouter từ file new
const useRouter = require('./employee');

const MeRouter = require('./me');
const handleAccount = require('./AccountUser');
const handleLike = require('./LikeNumber');
const OptionFilm = require('./SearchAndResult');

function route(app) {
    //   Thêm đường dẫn và sử dụng nó
    app.use('/employee', useRouter);
    app.use('/accounts', handleAccount);
    app.use('/likenumber', handleLike);
    app.use('/me', MeRouter);
    app.use('/optionFilm', OptionFilm);
    app.use('/', siteRouter);
}

module.exports = route;
