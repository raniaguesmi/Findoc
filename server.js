//**********************************importation des modules quon veut utilisé ***************************************************************/

const express= require('express')
const bodyParser=require('body-parser')
/************************************ importation de routers privées********************************************************************/

//
const db=require('./db')
const medecin=require('./routers/medecinRouter')
const patient=require('./routers/patientRouter')
const app=express(); // app est une instance d'express
 app.use(bodyParser.urlencoded({extended:false}))
 app.use(bodyParser.json())
/************************************* utilisation de route importé  ************************************************************* */



 app.use('/medecin',medecin)
 app.use('/patient',patient)


 app.listen(3000,function(){
     console.log('******* Hello the server is runnig on port 3000 *******')
 })