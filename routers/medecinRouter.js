const medecinController=require('../controllers/medecinController');
const router=require('express').Router();
/*Express est un meadelweare fondamentale dans node il permet comme fonctionnalité de base la gestion de routes  */


/**********************************defininition des routes pour chaque fonctionnalité***************************************************************/

router.post('/ajouter',medecinController.ajouter)
router.put('/modifier/:id',medecinController.modifier)
router.delete('/supprimer/:id',medecinController.supprimer)
router.get('/listeMedecins',medecinController.listeMedecin)


module.exports=router;