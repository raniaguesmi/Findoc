//**********************************importation des modules quon veut utilisé ***************************************************************/

const express= require('express')
const bodyParser=require('body-parser')//On utilise le module body-parser afin de récupérer les paramètres envoyés par les formulaire 

var morgan = require ('morgan') // morgan et cors necessite une installation npm i morgan cors
const cors = require('cors')
/************************************ importation de routers privées********************************************************************/

//
const db=require('./db')
const medecin=require('./routers/medecinRouter')
const patient=require('./routers/patientRouter')
const secretaire=require('./routers/secretaireRouter')
const utilisateur=require('./routers/utilisateurRouter')
const specialite=require('./routers/specialiteRouter')
const app=express(); // app est une instance d'express
 app.use(bodyParser.urlencoded({extended:false}))
 app.use(bodyParser.json())
/************************************* utilisation de route importé  ************************************************************* */
app.set( 'secretKey', 'pfe') // this is for jwt ! error found if i remove it is  Error: secretOrPrivateKey must have a value

app.use(morgan('dev'));//Morgan is a HTTP request logger middleware for Node.js. It simplifies the process of logging requests to your application
app.use(cors('*')) //Cors: it provides a middleware to handle cross-origin resource sharing


 app.use('/medecin',medecin)
 app.use('/patient',patient)
app.use('/secretaire',secretaire)
app.use('/utilisateur',utilisateur)
app.use('/specialite',specialite)
 app.listen(3000,function(){
     console.log('******* Hello the server is runnig on port 3000 *******')
 })