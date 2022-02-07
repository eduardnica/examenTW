const express = require("express");
const router = express.Router();
const referencesController=require("../controllers").references;
router.get('/getReferences', referencesController.getReferences);
router.post('/addReference', referencesController.addReference);
router.put('/modifyReference/:referenceID/:articleID', referencesController.modifyReference);   
router.delete('/deleteReference/:referenceID', referencesController.deleteReference);
module.exports=router;