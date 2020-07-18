const messageController=require('../controllers/messageController')
const router=require('express').Router()
router.post('/ajouter',messageController.ajouter)
router.get('/afficher',messageController.afficher)
router.get('/reclamationParPatient/:id',messageController.reclamationParPatient)
router.get('/reclamationParMedecin/:id',messageController.afficherParMed)
router.get('/reclamationParId/:id',messageController.reclamationParId)

module.exports=router;