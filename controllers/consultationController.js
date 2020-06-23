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


}