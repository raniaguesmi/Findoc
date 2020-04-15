const utilisateurController=require('../controllers/utilisateurController')
const router=require('express').Router()

router.post('/authentification',utilisateurController.authentification)

module.exports = router;
