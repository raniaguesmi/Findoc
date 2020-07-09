const patientController=require('../controllers/patientController')
const router=require('express').Router()
const multer = require('multer');
//const upload = multer({dest: __dirname + '/uploads/images'});

router.post('/ajouter', patientController.ajouter);
router.get('/afficher',patientController.afficher)
router.put('/modifier',patientController.modifier)
router.delete('/supprimer/:id',patientController.supprimer)
router.get('/afficheParId/:id',patientController.afficheParId)
router.post('/veriftel',patientController.verifTel)
router.get('/patientsDeMedcin/:id',patientController.PatientsDeMedcin)
router.get('/nbrPatients',patientController.nombrePatients)
router.get('/comparePassword/:id/:password',patientController.comparerPassword)
module.exports = router;
