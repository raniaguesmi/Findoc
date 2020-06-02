const mongoose = require('mongoose')// l'ORM qui fait le mapping entre node et mongoDB ! 

const rdvSchema=mongoose.model('rdv',new mongoose.Schema({
    date:{type:String, required:true},
    heure:{type:Number, required:true},
    medecin:{type:String, required:true},
    patient:{type:String, required:true},
    motif:{type:String, required:true},
    // state:{type:String,required:true}
}))

module.exports=rdvSchema;