const medecinController=require('../controllers/medecinController');
const router=require('express').Router();
/*Express est un meadelweare fondamentale dans node il permet comme fonctionnalité de base la gestion de routes  */
const multer = require('multer');

const upload = multer({dest: __dirname + '/uploads/images'});
/*dest is where to store files */
   

/**********************************defininition des routes pour chaque fonctionnalité***************************************************************/

router.post('/ajouter',upload.single('image'),medecinController.ajouter)
router.put('/modifier/:id',upload.single('image'),medecinController.modifier)
router.delete('/supprimer/:id',medecinController.supprimer)
router.get('/listeMedecins',medecinController.listeMedecin)
router.get('/afficheParId/:id',medecinController.afficheParId)
router.get('/affichePhoto/:image',medecinController.affichePhoto)

module.exports = router;
