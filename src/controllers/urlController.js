const urlModel = require('../models/urlModel');

// -----------------createShortUrl-------------------------------
const createShortURL = async function (req, res) {
    let data = req.body
    if (Object.keys(data).length===0) {
        return res.send('All field are required')
    }
    let { longUrl, urlCode } = data

    if (!longUrl) {
        return res.send('longUrl field is required')
    }
    if (!urlCode) {
        return res.send('urlCode field is required')
    }
    if (urlCode.trim().length <5) {
        return res.send("Url Code atleast 5 character")
    }
    let uniqueCode = await urlModel.findOne({ urlCode: urlCode })
    if (uniqueCode) {
        return res.send("URL Code already exist Please put another code")
    }
    let shortUrl = `http://localhost:4000/${urlCode}`
    let newData = {
        longUrl:`${longUrl}`,
        urlCode:`${urlCode}`
    }
    newData.shortUrl = shortUrl
    // console.log(newData);
    let savedData = await urlModel.create(newData)
    // res.cookie("longUrl", longUrl)
    // res.cookie("longUrl", longUrl,{expires:new Date(Date.now()+900000),httpOnly:true})
    // res.cookie("url":urlCode,{path:'/admin'})
    // res.cookie("","" , { maxAge: 10000 })
    // res.clearCookie("longurl")
    // console.log(req.cookies);
    // console.log(req.cookies.longUrl);
    res.send({ status: true, data: savedData, msg: 'cookie-set' })
    
}

// -----------get Short URl----------------//
const getShortUrl = async (req, res) => {
    try {
        let urlCode = req.query.urlCode
        let longUrl = req.query.longUrl
        let data = await urlModel.findOne({ $and: [{urlCode: urlCode},{longUrl:longUrl}]})
        if (!data) {
            return res.send({ status: false, msg: 'this url  is not available' })
        }
        let shortUrl = await urlModel.findOne({ urlCode: urlCode }).select({ shortUrl: 1, _id: 0 })
        res.send(shortUrl)
    } catch (error) {
        res.send(error.message)
    }
}

const redirectOriginalUrl = async (req, res)=>{
    try {
        let urlCode = req.params.urlCode

        let data= await urlModel.findOne({ urlCode:urlCode })
        if (!data) {
            return res.send({ status: false, msg: 'this url  is not available' })
        }
        let longUrl = await urlModel.findOne({ urlCode:urlCode }).select({ longUrl: 1, _id: 0 })
        let longUrlValue = longUrl.longUrl
        console.log(data.shortUrl);
        try {
            return res.redirect(longUrlValue);
        } catch (error) {
            console.log(error.message);
            res.send(error.message)
        }
        
    } catch (error) {
        res.send(error.message);
    }
}

module.exports = { createShortURL, redirectOriginalUrl,getShortUrl }