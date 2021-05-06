import jwt from "jsonwebtoken";

const auth = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const iscustomauth = token.length < 500;
        let decodedata;
        if (token && iscustomauth) {
            decodedata = jwt.verify(token, 'test');
            req.userId = decodedata?.id;
        } else {
            decodedata = jwt.decode(token);
            req.userId = decodedata?.sub;
        }
        
        next();
    } catch(err) {
        console.log(err);
    }
}

export default auth;
