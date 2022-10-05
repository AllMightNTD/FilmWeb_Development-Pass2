const jwt = require('jsonwebtoken');
const JWT_SECRET = 'sdasdklajlskjdlweqwoeioiu!@#%^&*())jklmsdadsdhhweqkl';
exports.checkCurrentUser = (req, res, next) => {
    const Authorization = req.header('authorization');
    if (!Authorization) {
        req.uer = null;
        next();
    } else {
        const token = req.headers['authorization'];
        console.log(token);
        try {
            req.user = jwt.verify(token, JWT_SECRET);
            console.log(req.user);
            console.log(jwt.verify(token, JWT_SECRET).username);
            next();
        } catch (error) {
            console.log(error.message);
        }
    }
};
