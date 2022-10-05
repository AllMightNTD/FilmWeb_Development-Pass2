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
            const { userID } = jwt.verify(token, JWT_SECRET);
            req.user = userID;
            console.log(jwt.verify(token, JWT_SECRET));
            next();
        } catch (error) {
            console.log(error.message);
        }
    }
};
