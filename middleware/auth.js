const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const tokenHeader = req.get('Authorization');
    if(!tokenHeader){
        req.isAuth = false;
        return next();
    }
    const token = tokenHeader.split(' ')[1];
    let decodeToken;
    try {
        decodeToken = jwt.verify(token, 'somesupersecretkey');
    } catch (error) {
        req.isAuth = false;
        return next();
    }
    if(!decodeToken){
        req.isAuth = false;
        return next();
    }
    req.userId = decodeToken.userId;
    req.isAuth = true;
    next();
}