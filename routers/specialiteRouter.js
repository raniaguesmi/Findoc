const specialiteController=require('../controllers/specialiteController')
const router=require('express').Router()
router.post('/ajouter',specialiteController.ajouter)
router.get('/afficher',specialiteController.afficher)
router.put('/modifier/:id',specialiteController.modifier)
router.delete('/supprimer/:id',specialiteController.supprimer)

module.exports=router;