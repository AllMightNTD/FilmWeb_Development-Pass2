// import newRouter từ ngoài vào
const siteRouter = require('./site');
// Lấy newRouter từ file new
const useRouter = require('./employee');

const MeRouter = require('./me');

function route(app) {
    //   Thêm đường dẫn và sử dụng nó
    app.use('/employee', useRouter);
    app.use('/me', MeRouter);
    app.use('/', siteRouter);
}

module.exports = route;
