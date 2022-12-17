const JWT = require('jsonwebtoken');
const { isValidObjectId } = require('../validation/validate')
const userModel = require("../model/userModel");


const Authentication = async (req, res, next) => {
    try {
        // accessing token from headers
        let token = req.headers.authorization;
        if (!token) return res.status(401).send({ status: false, message: 'TOKEN is missing !!!' });

        // console.log({ token: token })
        let user = token.split(' ');
        // console.log({ token: user })

        JWT.verify(
            user[1],
            "na&^resh&%$2Go!2hil@3579e2$%#*",
            (err, decodedToken) => {
                if (err) return res.status(400).send({ status: false, message: err.message })
                req.userId = decodedToken.userId
                next()
            });
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


const Authorization = async (req, res, next) => {
    try {
        // taking userId from params
        let userId = req.query.userId

        // validating id
        if (!isValidObjectId(userId)) return res.status(400).send({ status: false, message: "Invalid User Id" });

        // finding user in DB
        let checkUser = await userModel.findById(userId)
        if (!checkUser) return res.status(404).send({ status: false, message: "User not found" })

        // authorizing the user
        if (userId != req.userId) return res.status(403).send({ status: false, message: "Unauthorized" })

        next();
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


module.exports = { Authentication, Authorization };