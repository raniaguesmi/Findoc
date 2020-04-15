/**********************************importation de module a utilisé ***************************************************************/

const mongoose = require('mongoose')// l'ORM qui fait le mapping entre node et mongoDB ! 
const utlisateurs=require('./utilisateurModel')

/**********************************defininition de schema ***************************************************************/
// descriminator pour dire eli houwa l classe fille mte3 l user ye5ou tout les attributs du model user wizidhom attributs specifique sil existe

const medecinSchema=utlisateurs.discriminator('medecin', new mongoose.Schema ({
    email:{type:String,required:true},
    image:{type:String,required:false},
    adresseCabinet:{type: String, required : true,trim :true},
    specialite:{type: String, required:true , trim:true},
}
))

module.exports=medecinSchema;