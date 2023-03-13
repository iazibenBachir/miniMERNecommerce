const jwt = require("jsonwebtoken");
const User = require("../models/User");
const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "authorization token required" })
    }
    const token = authorization.split(" ")[1];
    try {
        const decode = jwt.verify(token, process.env.SECRET);
        const _id = decode.id;
        //console.log("#####=>", _id)
        req.user = await User.findOne({ _id }).select("_id");
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ error: err.message });

    }
}
module.exports = requireAuth;