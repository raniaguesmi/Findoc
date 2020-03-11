var mongoose= require('mongoose')//Mongoose va servir de passerelle entre notre serveur Node. js et notre serveur MongoDB. 
 var bcrypt = require ('bcrypt') //
const Schema = require('mongoose').Schema;
//classe pere mte3i hekke naml el heritage
const baseoption={

    discriminatorKey :'type', //ynjm ikoun ay hja
    collection :'utilisateurs', //the name of our collections
  
  }
  const utilisateursSchema= mongoose.model('utilisateurs',new mongoose.Schema({
    nom: {type: String,required : true,trim :true},
    prenom: {type: String,required : true,trim :true},
    login:{type: String,required : true,trim :true},
    password: {type: String,required : true,trim :true},
    dateNaissance:{type: String, required : true,trim :true},
    adresse:{type: String, required : true,trim :true},
    telephone:{type: Number, required : true},
    image: {type: String,required : false},
    cin:{type: Number, required : true},
    email: {type: String, required : true },} 
, baseoption
)
  
      .pre("save",function (next) {
        this.password=bcrypt.hashSync(this.password,10);//hashSync : Store hash in password attrebute 
        next();
  
      })
  );
  
  module.exports= utilisateursSchema;