const rdvController=require('../controllers/rdvController')
const router=require('express').Router()


router.post('/ajouter',rdvController.ajouter)
router.get('/afficher',rdvController.afficher)
router.get('/rdvParMed/:id',rdvController.rdvParMed)
router.get('/afficheComplet',rdvController.afficheComplet)

module.exports=router;