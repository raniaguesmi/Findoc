const patientController=require('../controllers/patientController')
const router=require('express').Router()
const multer = require('multer');
//const upload = multer({dest: __dirname + '/uploads/images'});

router.post('/ajouter', patientController.ajouter);
router.get('/afficher',patientController.afficher)
router.put('/modifier/:id',patientController.modifier)
router.delete('/supprimer/:id',patientController.supprimer)
router.get('/afficheParId/:id',patientController.afficheParId)

module.exports = router;
