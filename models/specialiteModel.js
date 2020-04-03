const mongoose=require('mongoose')

const specialiteSchema=mongoose.model('spécialité',new mongoose.Schema({
    nom:{type:String, required:true, trim:true}
}))

module.exports=specialiteSchema;