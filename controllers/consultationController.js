const consultationModel=require('../models/consultationModel')
module.exports={

    ajouter:function(req,res){
     
let date_ob = new Date();
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let minutes = date_ob.getMinutes();

let  datee=date+"-"+month+"-"+year+" à "+hours+":"+minutes
console.log(date)
           const consultation=new consultationModel({
            date:datee,      
            patient:req.body.patient,
            medecin:req.body.medecin,
            diagnostique:req.body.diagnostique,
            traitement:req.body.traitement,

            })
            consultation.save(function (err) {
            if (err) {
              res.json({state: 'no', msg: 'vous avez un erreur ' + err})
            }
            else{res.json({state:'ok',msg:'consulation ajouté avec succée'})}
          })
      
    },

afficherParMedetPat:function(req,res){
  consultationModel.find({medecin:req.params.idmed,patient:req.params.idpat},function(err,liste){
    if(err){res.json({state:'no', message:'ya un erreur:'+err})}
    else{res.json(liste)}
})
},
supprimer:function(req,res){
  consultationModel.deleteOne({_id:req.params.id},function(err,rslt){
    if(err){res.json(err)}
    else{res.json({state:"ok",message:"consultation est supprimer avec succées"})}
  })
},
modifier:function(req,res){
consultationModel.updateOne({_id:req.params.id},{$set:req.body},{
  patient:req.body.patient,
            medecin:req.body.medecin,
  diagnostique:req.body.diagnostique,
traitement:req.body.traitement,

},function(err,result){
 if(err){res.json(err)}
 else{res.json({state:"ok",message:"la consultation a été modifié avec succées"})}
})

}
}