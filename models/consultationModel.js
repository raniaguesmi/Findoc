const mongoose = require('mongoose')// l'ORM qui fait le mapping entre node et mongoDB ! 

const consultationSchema=mongoose.model('consultation',new mongoose.Schema({
    date:{type:String, required:true},
    medecin:{type:String, required:true},
    patient:{type:String, required:true},
    diagnostique:{type:String, required:true},
    traitement:{type:String,required:true}
}))

module.exports=consultationSchema;