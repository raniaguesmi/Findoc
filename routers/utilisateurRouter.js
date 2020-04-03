const utilisateurController=require('../controllers/utilisateurController')
const router=require('express').Router()

router.post('/authentification/:id',utilisateurController.authentification)

module.exports = router;
