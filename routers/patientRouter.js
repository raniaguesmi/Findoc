const patientController=require('../controllers/patientController')
const router=require('express').Router()
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'});

router.post('/ajouter',upload.single('image'),patientController.ajouter);
router.get('/afficher',patientController.afficher)
router.put('/modifier/:id',upload.single('image'),patientController.modifier)
router.delete('/supprimer/:id',patientController.supprimer)
module.exports = router;
