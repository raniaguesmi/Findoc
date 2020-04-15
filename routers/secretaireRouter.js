const secretaireController=require('../controllers/secretaireController')
const router=require('express').Router()
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'});

router.post('/ajouter',upload.single('image'),secretaireController.ajouter);
router.get('/afficher',secretaireController.afficher)
router.put('/modifier/:id',upload.single('image'),secretaireController.modifier)
router.delete('/supprimer/:id',secretaireController.supprimer)
router.get('/afficherParMedecin/:id',secretaireController.afficherParMedecin)
module.exports = router;
