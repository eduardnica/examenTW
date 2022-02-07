const ReferenceDB= require("../models").References;
const controller={

    getReferences:async (req,res) =>{
        try{
            const references = await ReferenceDB.findAll();
            if (references) {
                return res.status(200).send(references);
            } else {
                return res.status(404).send({ message: "Not found" })
            }
        } catch (err) {
            return res.status(500).send(err);
        } 
    },

    addReference: async(req,res)=>{
        try {
            let reqBody = req.body;
            if (
              reqBody.Referencetitle &&
              reqBody.Referencedate &&
              reqBody.authors &&
              reqBody.id
            ) {
                let reference = await ReferenceDB.create(req.body);
                res
                  .status(201)
                  .send({ message: "Created reference successfully" });
              } 
              else res.status(400).send({message: "nu sunt date",reqbody:reqBody});
          } catch (err) {
            res.status(500).send({ message: `${err}` });
          }
    },

    modifyReference: async(req,res)=>{
        try{
            let reqBody=req.body;
            const reference = await ReferenceDB.findOne({where:{id:req.params.articleID,Referenceid:req.params.referenceID}});
            if(reqBody.Referencetitle) reference.update({Referencetitle:reqBody.Referencetitle});
            else if(reqBody.Referencedate) reference.update({Referencedate:reqBody.Referencedate});
            else if(reqBody.authors) reference.update({authors:reqBody.authors});
        }catch(err){
            res.status(500).send({message: `${err}`});
        }
    },

    deleteReference: async(req,res)=>{
        try {
            if (req.params.referenceID>0) {
              let reference = await ReferenceDB.findOne({ where: { Referenceid: req.params.referenceID } });
              if (reference == null) {
                res.status(404).send({ message: "Reference not found" });
              }else {
              ReferenceDB.destroy({where:{Referenceid: req.params.referenceID}});
              res.status(201).send({message: "Reference deleted"});
            }
          } 
        }catch (err) {
            res.status(500).send({ message: `${err}` });
          }
    }
}

module.exports=controller;