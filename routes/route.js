const express=require("express")
const {createUrl,getUrl}=require("../controllers/urlcontroller")
const router=express.Router()


router.post("/url/shorten", createUrl)
 router.get("/:urlCode",getUrl)


module.exports=router