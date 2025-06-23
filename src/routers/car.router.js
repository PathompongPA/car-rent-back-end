const express = require('express');
const { CAR, IMG } = require('../model');
const carRouter = express.Router()
carRouter.
    get("",
        /**
         * @param {import('express').Request} req 
         * @param {import('express').Response} res 
         */
        (req, res) => {
            res.json()
        })


module.exports = {
    carRouter
}