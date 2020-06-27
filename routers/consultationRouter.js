const consultationController=require('../controllers/consultationController')
const router=require('express').Router()

router.post('/ajouter',consultationController.ajouter)
router.get('/afficheParMed/:idmed/:idpat',consultationController.afficherParMedetPat)
router.delete('/supprimer/:id',consultationController.supprimer)
router.put('/modifier/:id',consultationController.modifier)

module.exports=router;