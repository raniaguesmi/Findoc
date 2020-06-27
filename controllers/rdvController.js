const rdvModel=require('../models/rdvModel')
// var ObjectID = require("mongodb").ObjectID;
let date_ob = new Date();
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let minutes = date_ob.getMinutes();
//+" à "+hours+":"+minutes
let  datee=date+"-"+month+"-"+year

var rdvPassé=0;
var rdvAvenir=0;
var rdvDay=0;
module.exports={
ajouter:function(req,res){
    rdvModel.findOne({date:req.body.date,heure:req.body.heure},function(err,reslt){
        if(reslt==null){
            const rdv=new rdvModel({
                date:req.body.date,
                heure:req.body.heure,
                medecin:req.body.medecin,
                patient:req.body.patient,
                motif:req.body.motif,
                state:'en attente'
            })
            rdv.save(function(err){
                if(err){res.json({state:'no',message:'ya un erreur :'+err})}
                else{res.json({state:'ok',message:'rendez-vous ajouté avec succées'})}
            })
        }
        else{res.json({state:'no',message:'date est deja prise'})}
    })
  
},
afficher:function(req,res){
    rdvModel.find({},function(err,liste){
        if(err){res.json({state:'no', message:'ya un erreur:'+err})}
        else{res.json(liste)}
    })
},
rdvParMed:function(req,res){
    rdvModel.find({medecin:req.params.id},function(err,liste){
        if(err){res.json({state:'no', message:'ya un erreur:'+err})}
        else{res.json(liste)}
    })
} ,

afficheComplet:function(req,res){
    //  var _id=_id.$oid
    rdvModel.aggregate([
       
            {
              "$addFields": {
                "patient": {
                  "$toObjectId": "$patient"
                }
              }
            },
            {
              "$lookup": {
                "from": "utilisateurs",
                "localField": "patient",
                "foreignField": "_id",
                "as": "info"
              }
            },
            {
              "$unwind": "$info"
            },
            {
              "$project": {
                date: 1,
                heure: 1,
                motif: 1,
                info: 1
              }
            }
    ],function(err,result){
        if(err){res.json({state:'no',message:'errc!!!'+err})}
        else{res.json(result) }
    });
},

listpatient:function(req,res){  
       var id=req.params.id   
       rdvModel.aggregate([       
         {$match:{"medecin": id}},      
  {
          "$group": {

           _id:{"patient":"$patient" } 
          }
        },
        {
          "$group": {

           _id:"$_id.patient" 
          }
        },

  { "$addFields": {
             "_id": {
               "$toObjectId": "$_id"
             }
           }
         },
         
         { "$lookup": {
             "from": "utilisateurs",
             "localField": "_id",
             "foreignField": "_id",
             "as": "info"
           }
         },

        { "$unwind": "$info"   },

         { "$project": {
            _id:0,
               info: 1
           }
         }
       ],function(err,result){
           if(err){res.json({state:'no',message:'errc!!!'+err})}
           else{
            console.log(result)  ,
           res.json(result) 
            }
       });
   },

afficheRDVAttenteParMed:function(req,res){
       var id=req.params.id
       //aggregate me3nehe tjeme3 l data lkol w {} ytseme stage w kol stage yet3ede input le stage le5er o8zer chamlt eni 
       rdvModel.aggregate([
           //awel heje filtret 3la 7seb l medcin mte3i bech ijbdli kan mte3 rania par exemple
         {$match:{"medecin": id}},
         {$match:{"state": 'en attente'}},

         //lene amlt filed e5er bech njm nestoki fih patient mahou houwe ken string mnjmch n5dm bih 5tr bch n9arnou bl object id
         //donc mchet bedltlou type mte3ou objectId
         {
           "$addFields": {
             "patient": {
               "$toObjectId": "$patient"
             }
           }
         },
         //lookup 3ibara ala jointure : lene 9otlou bara lel collection utilisateurs lewjli 3ala valeur mte3 l patient li houwe mte3i fl collection mte3i 
         //fel chapm esmou _id eli houwa foreignkey fl collection lo5ra utilisateurs hekke ymchi yjbedhomm 
         {
           "$lookup": {
             "from": "utilisateurs",
             "localField": "patient",
             "foreignField": "_id",
             "as": "info"
           }
         },
         //lene bech ijibli l info sous form dun array wahna lerray s3ib n5dmou bih objectId njmou njbdou facile donc  loperateur
         //$unwind ye5ou l array iroudou string mes kan linfo rahouu haka aleh tala3heli heke 
         {
           "$unwind": "$info"
         },
         /** be3ed mejebli li hachty bih lkol tba9a kan bch nprojectiw li n7bou alih 0 ma3nehe matale3helich w 1 ma3nehe afichiheli
          * Which 0 means, do not put and 1 means put.
           */
         {
           "$project": {
               //lene 9otlha afichili datew motif wlinfo haka aleh hatene 9odemha 1 ataw njarbou n7otou 9odem wa7de menha 0 wnchoufou chtatine
               _id : 1,
               date: 1,
             heure: 1,
             motif: 1,
             info: 1
           }
         }
       ],function(err,result){
           if(err){res.json({state:'no',message:'errc!!!'+err})}
           else{res.json(result) }
       });

},
supprimerRdv:function(req,res){
  rdvModel.deleteOne({_id:req.params.id},function(err){
    if(err){res.json({state:'no',message:'il ya un erreur'}+err)}
    else{res.json({state:'ok',message:'le rdv a été supprimé avec succées'})}
})
},
afficheRDVconfirme:function(req,res){
  var id=req.params.id
  //aggregate me3nehe tjeme3 l data lkol w {} ytseme stage w kol stage yet3ede input le stage le5er o8zer chamlt eni 
  rdvModel.aggregate([
      //awel heje filtret 3la 7seb l medcin mte3i bech ijbdli kan mte3 rania par exemple
    {$match:{"medecin": id}},
    {$match:{"state": 'confirmé'}},

    //lene amlt filed e5er bech njm nestoki fih patient mahou houwe ken string mnjmch n5dm bih 5tr bch n9arnou bl object id
    //donc mchet bedltlou type mte3ou objectId
    {
      "$addFields": {
        "patient": {
          "$toObjectId": "$patient"
        }
      }
    },
    //lookup 3ibara ala jointure : lene 9otlou bara lel collection utilisateurs lewjli 3ala valeur mte3 l patient li houwe mte3i fl collection mte3i 
    //fel chapm esmou _id eli houwa foreignkey fl collection lo5ra utilisateurs hekke ymchi yjbedhomm 
    {
      "$lookup": {
        "from": "utilisateurs",
        "localField": "patient",
        "foreignField": "_id",
        "as": "info"
      }
    },
    //lene bech ijibli l info sous form dun array wahna lerray s3ib n5dmou bih objectId njmou njbdou facile donc  loperateur
    //$unwind ye5ou l array iroudou string mes kan linfo rahouu haka aleh tala3heli heke 
    {
      "$unwind": "$info"
    },
    /** be3ed mejebli li hachty bih lkol tba9a kan bch nprojectiw li n7bou alih 0 ma3nehe matale3helich w 1 ma3nehe afichiheli
     * Which 0 means, do not put and 1 means put.
      */
    {
      "$project": {
          //lene 9otlha afichili datew motif wlinfo haka aleh hatene 9odemha 1 ataw njarbou n7otou 9odem wa7de menha 0 wnchoufou chtatine
          _id : 1,
          date: 1,
        heure: 1,
        motif: 1,
        info: 1
      }
    }
  ],function(err,result){
      if(err){res.json({state:'no',message:'errc!!!'+err})}
      else{res.json(result) }
  });

},
accepterRdv:function(req,res){
rdvModel.updateOne({_id:req.params.id},{state:"confirmé"},{$set:req.body},function(err,liste){
  if(err){res.json({state:'no',message:'il ya un erreur'+err})}
  else{res.json({state:'ok',message:'le rdv a été confirmé'})}

})  
},

reporterRdv:function(req,res){
  rdvModel.updateOne({_id:req.body.id},{$set:req.body}
    ,{date:req.body.date,
      heure:req.body.heure,
      motif:req.body.motif,
    }
    
    ,function(err,rslt){
    if(err){res.send("NO")}
    else{res.send("OK")}
  
  })  
  },

rdvConfirmerParPatient:function(req,res){
  var id=req.body.id
  //aggregate me3nehe tjeme3 l data lkol w {} ytseme stage w kol stage yet3ede input le stage le5er o8zer chamlt eni 
  rdvModel.aggregate([
      //awel heje filtret 3la 7seb l medcin mte3i bech ijbdli kan mte3 rania par exemple
    {$match:{"patient": id}},
    {$match:{"state": "confirmé"}},

    //lene amlt filed e5er bech njm nestoki fih patient mahou houwe ken string mnjmch n5dm bih 5tr bch n9arnou bl object id
    //donc mchet bedltlou type mte3ou objectId
    {
      "$addFields": {
        "medecin": {
          "$toObjectId": "$medecin"
        }
      }
    },
    //lookup 3ibara ala jointure : lene 9otlou bara lel collection utilisateurs lewjli 3ala valeur mte3 l patient li houwe mte3i fl collection mte3i 
    //fel chapm esmou _id eli houwa foreignkey fl collection lo5ra utilisateurs hekke ymchi yjbedhomm 
    {
      "$lookup": {
        "from": "utilisateurs",
        "localField": "medecin",
        "foreignField": "_id",
        "as": "info"
      }
    },
    //lene bech ijibli l info sous form dun array wahna lerray s3ib n5dmou bih objectId njmou njbdou facile donc  loperateur
    //$unwind ye5ou l array iroudou string mes kan linfo rahouu haka aleh tala3heli heke 
    {
      "$unwind": "$info"
    },
    /** be3ed mejebli li hachty bih lkol tba9a kan bch nprojectiw li n7bou alih 0 ma3nehe matale3helich w 1 ma3nehe afichiheli
     * Which 0 means, do not put and 1 means put.
      */
    {
      "$project": {
          //lene 9otlha afichili datew motif wlinfo haka aleh hatene 9odemha 1 ataw njarbou n7otou 9odem wa7de menha 0 wnchoufou chtatine
          _id : 0,
          date: 1,
        heure: 1,
        motif: 1,
        info: 1
      }
    }
  ],function(err,result){
      if(err){res.json({state:'no',message:'errc!!!'+err})}
      else{res.json(result) }
  });

},
rdvAttenteParPatient:function(req,res){
  var id=req.body.id
  //aggregate me3nehe tjeme3 l data lkol w {} ytseme stage w kol stage yet3ede input le stage le5er o8zer chamlt eni 
  rdvModel.aggregate([
      //awel heje filtret 3la 7seb l medcin mte3i bech ijbdli kan mte3 rania par exemple
    {$match:{"patient": id}},
    {$match:{"state": "en attente"}},

    //lene amlt filed e5er bech njm nestoki fih patient mahou houwe ken string mnjmch n5dm bih 5tr bch n9arnou bl object id
    //donc mchet bedltlou type mte3ou objectId
    {
      "$addFields": {
        "medecin": {
          "$toObjectId": "$medecin"
        }
      }
    },
    //lookup 3ibara ala jointure : lene 9otlou bara lel collection utilisateurs lewjli 3ala valeur mte3 l patient li houwe mte3i fl collection mte3i 
    //fel chapm esmou _id eli houwa foreignkey fl collection lo5ra utilisateurs hekke ymchi yjbedhomm 
    {
      "$lookup": {
        "from": "utilisateurs",
        "localField": "medecin",
        "foreignField": "_id",
        "as": "info"
      }
    },
    //lene bech ijibli l info sous form dun array wahna lerray s3ib n5dmou bih objectId njmou njbdou facile donc  loperateur
    //$unwind ye5ou l array iroudou string mes kan linfo rahouu haka aleh tala3heli heke 
    {
      "$unwind": "$info"
    },
    /** be3ed mejebli li hachty bih lkol tba9a kan bch nprojectiw li n7bou alih 0 ma3nehe matale3helich w 1 ma3nehe afichiheli
     * Which 0 means, do not put and 1 means put.
      */
    {
      "$project": {
          //lene 9otlha afichili datew motif wlinfo haka aleh hatene 9odemha 1 ataw njarbou n7otou 9odem wa7de menha 0 wnchoufou chtatine
          _id : 1,
          date: 1,
        heure: 1,
        motif: 1,
        state:1,
        info: 1
      }
    }
  ],function(err,result){
      if(err){res.json({state:'no',message:'errc!!!'+err})}
      else{res.json(result) }
  });

},


afficherParId:function(req,res){
  rdvModel.findOne({_id:req.params.id},function(err,liste){
      if(err){res.json({state:'no', message:'ya un erreur:'+err})}
      else{res.json(liste)}
  })
},


nombreRdvs:function(req,res){
  rdvModel.count({},function(err,nb){
    if(err){res.json({state:'no', message:'there is an error'})}
    else{res.json(nb)}
  })
},

rdvAvenir:function(req,res){
  rdvModel.find({},function(err,nb){
    if(err){res.json({state:'no', message:'there is an error'})}
    else{

      for(var i = 0; i < nb.length;i++){
                     if(i.date<this.datee){   rdvPassé++   }
                    //  if(i.date>this.datee){rdvAvenir++}
                    // if(i.date==this.datee){rdvDay++} 

  }
    }
  })
  res.json(rdvPassé)

},

nombreRdvs:function(req,res){
  rdvModel.count({},function(err,nb){
    if(err){res.json({state:'no', message:'there is an error'})}
    else{res.json(nb)}
  })
}



}