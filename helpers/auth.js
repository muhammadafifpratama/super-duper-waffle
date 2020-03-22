
const jwt = require('jsonwebtoken');

module.exports = {
    auth: (req, res, next) => {
        console.log(req.method)
        if (req.method !== "OPTIONS") {
            console.log(req.token)
            console.log(req.query)
            console.log(req.headers.authorization)
            jwt.verify(req.headers.authorization, "tinkiwinki", (error, decoded) => {
                if (error) {
                    console.log(error.response)
                    // return res.status(401).json({ message: "User not authorized.", error: "User not authorized." });
                    return res.status(401).json({ message: error });
                }
                console.log(decoded)
                req.user = decoded;
                next();
            });
        } else {
            next();
        }
    }
}