/**********************************importation de module a utilisé ***************************************************************/

const mongoose = require('mongoose')// l'ORM qui fait le mapping entre node et mongoDB ! 
const bcrypt = require('bcrypt') // cest un module qui permet le Hashage de password // module de securité


/**********************************defininition de schema ***************************************************************/
const medecinSchema=mongoose.model('medecin', new mongoose.Schema ({

    nom: { type: String, required : true,trim :true},
    prenom: { type: String, required : true,trim :true},
    email: {type: String, required : true },
    password: {  type: String, required : true, trim :true },
    adresseCabinet:{type: String, required : true,trim :true},
    telephone:{type: Number, required : true},
    dateNaissance:{type: String, required : true,trim :true},
    cin:{type: Number, required : true},
    diplome:{type: String, required : true},
    cv:{type: String, required : true},
    image: { type: String, required : true},  
})
.pre("save",function (next) {
    this.password=bcrypt.hashSync(this.password,10);//hashSync : Store hash in password attrebute 
    next();

  }))

module.exports=medecinSchema;