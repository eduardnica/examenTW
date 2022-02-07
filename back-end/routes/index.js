const express = require("express");
const router = express.Router();
const articles=require("./articles");
const references= require("./references");
router.use("/",articles,references);
module.exports=router;