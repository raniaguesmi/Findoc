const mongoose=require('mongoose')

const messageSchema=mongoose.model('messages',new mongoose.Schema({
    date:{type:String, required:true, trim:true},
    titre:{type:String, required:true, trim:true},
    contenu:{type:String, required:true, trim:true},
    idpatient:{type:String, required:true, trim:true},
    idmedecin:{type:String, required:true, trim:true}

}))

module.exports=messageSchema;