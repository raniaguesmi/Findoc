const medecinController=require('../controllers/medecinController');
const router=require('express').Router();
/*Express est un meadelweare fondamentale dans node il permet comme fonctionnalité de base la gestion de routes  */
const multer = require('multer');

const upload = multer({dest: __dirname + '/uploads/images'});
/*dest is where to store data */
var cpUpload = upload.fields([{ name: 'image', maxCount: 1 },{ name: 'diplome', maxCount: 1 },{ name:'cv', maxCount: 1 },
   ])

/**********************************defininition des routes pour chaque fonctionnalité***************************************************************/

router.post('/ajouter',cpUpload,medecinController.ajouter)
router.put('/modifier/:id',cpUpload,medecinController.modifier)
router.delete('/supprimer/:id',medecinController.supprimer)
router.get('/listeMedecins',medecinController.listeMedecin)
router.get('/afficheParId/:id',medecinController.afficheParId)

module.exports = router;
