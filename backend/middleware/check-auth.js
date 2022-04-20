const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    try{
        const token = req.headers.authorization.split(' ')[1];
    }catch(err){
        return res.json({error: 'authentication failed'});
    }
    

    if(token === undefined){
        return res.json({error : 'Authentication Failed'});
    }
    const decodedToken = jwt.verify(token, 'superidol');
    req.userData = {userId : decodedToken.userId};
    console.log(token);
    next();
}