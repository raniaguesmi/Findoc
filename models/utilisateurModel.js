var mongoose= require('mongoose')//Mongoose va servir de passerelle entre notre serveur Node. js et notre serveur MongoDB. 
 var bcrypt = require ('bcrypt') //
const Schema = require('mongoose').Schema;
//classe pere mte3i hekke naml el heritage
const baseoption={
//type cest pas un attr normal mais il sagit dun att qui nous permet la distingtion entre les classe files
    discriminatorKey :'type', //ynjm ikoun ay hja
    collection :'utilisateurs', //the name of our collections
  //le nom de notre classe mere est utilisateur 
  }
  //les att en commun  
  const utilisateursSchema= mongoose.model('utilisateurs',new mongoose.Schema({
    nom: {type: String,required : true,trim :true},
    prenom: {type: String,required : true,trim :true},
    login:{type: String,required : true,trim :true},
    password: {type: String,required : true,trim :true},
    dateNaissance:{type: String, required : true,trim :true},
    adresse:{type: String, required : true,trim :true},
    telephone:{type: Number, required : true},
   // image: {type: String,required : false},
    cin:{type: Number, required : true},
  } 
, baseoption
)
  //.pre save : manehe avant denregistrer le model dans la base de donnée hache moi lepassword
      .pre("save",function (next) {
        this.password=bcrypt.hashSync(this.password,10);//hashSync : Store hash in password attrebute 
        next();
  
      })
  );
  
  module.exports= utilisateursSchema;


  /*
  const baseOptions = {
  discriminatorKey: 'itemtype', // our discriminator key, could be anything
  collection: 'items', // the name of our collection
};

// Our Base schema: these properties will be shared with our "real" schemas
const Base = mongoose.model('Base', new mongoose.Schema({
      title: { type: String, required: true },
      date_added: { type: Date, required: true },
      redo: { type: Boolean, required: false },
    }, baseOptions,
  ),
);

module.exports = mongoose.model('Base'); */