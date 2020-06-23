const consultationController=require('../controllers/consultationController')
const router=require('express').Router()

router.post('/ajouter',consultationController.ajouter)



module.exports=router;