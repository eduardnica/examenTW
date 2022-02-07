const ArticleDB= require("../models").Articles;
const controller={

    getArticles: async (req,res)=>{
        try {
            const article = await ArticleDB.findAll();
            if (article) {
                return res.status(200).send(article);
            } else {
                return res.status(404).send({ message: "Not found" })
            }
        } catch (err) {
            return res.status(500).send(err);
        } 
    },

    addArticles: async (req,res)=>{
        try {
            let reqBody = req.body;
            if (
              reqBody.title &&
              reqBody.resume &&
              reqBody.date
            ) {
                let article = await ArticleDB.create(req.body);
                res
                  .status(201)
                  .send({ message: "Created article successfully" });
              } 
          } catch (err) {
            res.status(500).send({ message: `${err}` });
          }
    },

    modifyArticle: async (req,res)=>{
        try{
            let reqBody=req.body;
            const article = await ArticleDB.findOne({where:{id:req.params.articleID}});
            if(reqBody.title) article.update({title:reqBody.title});
            else if(reqBody.resume) article.update({resume:reqBody.resume});
            else if(reqBody.date) article.update({date:reqBody.date});
            else return res.status(404).send({ message: "Not found" });
        }catch (err) {
            res.status(500).send({ message: `${err}` });
          }
    },

    deleteArticle: async(req,res)=>{
        try {
            if (req.params.articleID>0) {
              let article = await ArticleDB.findOne({ where: { id: req.params.articleID } });
              if (article == null) {
                res.status(404).send({ message: "Article not found" });
              }else {
              ArticleDB.destroy({where:{id: req.params.articleID}});
              res.status(201).send({message: "Article deleted"});
            }
          } 
        }catch (err) {
            res.status(500).send({ message: `${err}` });
          }
    },

    getByTitleAndDate: async(req,res)=>{
        try{
            const articles = await ArticleDB.findAll({where:{date:req.body.date,title:req.body.title}});
            if (articles) {
                return res.status(200).send(articles);
            } else {
                return res.status(404).send({ message: "Not found" })
            }
        }catch(err){
            res.status(500).send({message:`${err}`});
        }
    },

    sortByTitle: async(req,res)=>{

        try{
            const articles= await ArticleDB.findAll({order: [["title","ASC"]],})
            if (articles) {
                return res.status(200).send(articles);
            } else {
                return res.status(404).send({ message: "Not found" })
            }
        }catch(err){
            res.status(500).send({message:`${err}`});
        }
    }

}

module.exports=controller;