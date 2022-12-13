const urlModel = require("../model/urlmodel")
const mongoose = require("mongoose")
const shortid = require("shortid")
const { valid, regForUrl } = require("../validator/validation")


const createUrl = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, message: "data is not present" }) }
        let { longUrl } = data


        if (valid(longUrl) == false) { return res.status(400).send({ status: false, message: "invalid  longUrl" }) }

        if (regForUrl(longUrl) == false) { return res.status(400).send({ status: false, message: "invalid  longUrl fomat" }) }
        let longUrlPresent = await urlModel.findOne({ longUrl: longUrl }).select({ _id: 0, __v: 0 })
        if (longUrlPresent) {

            return res.status(200).send({ status: true, message: longUrlPresent })
        }
        let code = shortid.generate()
        let newurl = `http://localhost:3000/${code}`
        let obj = {}
        obj.longUrl = longUrl
        obj.shortUrl = newurl
        obj.urlCode = code
        await urlModel.create(obj)
        return res.status(201).send({ status: true, message: obj })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}


let getUrl = async function (req, res) {
    try {
        let urlCode = req.params.urlCode
        let realUrl = await urlModel.findOne({ urlCode: urlCode })
        if (!realUrl) { return res.status(400).send({ status: false, message: "url is not prsent" }) }
        let originalUrl = realUrl.longUrl
        return res.status(302).redirect(originalUrl )

    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}











module.exports = { createUrl, getUrl }
