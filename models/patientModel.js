/**********************************importation de module a utilisé ***************************************************************/

const mongoose = require('mongoose')// l'ORM qui fait le mapping entre node et mongoDB ! 
const utlisateurs=require('./utilisateurModel')

/**********************************defininition de schema ***************************************************************/
// descriminator pour dire eli houwa l classe fille mte3 l user ye5ou tout les attributs du model user wizidhom attributs specifique sil existe

const patientSchema=utlisateurs.discriminator('patient', new mongoose.Schema ({
    taille:{type:String,required:false},
    poids:{type:Number,required:false},
    groupeSanguin:{type:String,required:false},
    allergie:{type:String,required:false},
    tel1:{type:Number,required:false},
    tel2:{type:Number,required:false},



    }))

module.exports=patientSchema;