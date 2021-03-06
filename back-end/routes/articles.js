const express = require("express");
const router = express.Router();
const articlesController=require("../controllers").articles;
router.get('/getArticles', articlesController.getArticles);
router.get('/getByTitleAndDate', articlesController.getByTitleAndDate);
router.get('/sortByTitle', articlesController.sortByTitle);
router.post('/addArticle',articlesController.addArticles);
router.put('/modifyArticle/:articleID',articlesController.modifyArticle);   
router.delete('/deleteArticle/:articleID',articlesController.deleteArticle);
module.exports=router;