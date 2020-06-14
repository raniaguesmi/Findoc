const reclamationModel=require('../models/reclamationModel')
module.exports={
    ajouter:function(req,res){
        var date= new Date().toISOString();
           const reclamation=new reclamationModel({
            date:date,
            titre:req.body.titre,
            contenu:req.body.contenu,
            idpatient:req.body.idpatient,

            })
            reclamation.save(function (err) {
            if (err) {
              res.json({state: 'no', msg: 'vous avez un erreur ' + err})
            }
            else{res.json({state:'ok',msg:'reclamation ajouté avec succée'})}
          })
           
        },

    afficher:function(req,res){
        reclamationModel.aggregate([
    {//awl haja n converti l idpatient mte3i ll objectId 5ater on peut pas comparer deux id un string et lautre objectId 
        "$addFields": {
            "idpatient": {
              "$toObjectId": "$idpatient"
            }
          }
    },
    //lookup 3ibara ala jointure : lene 9otlou bara lel collection utilisateurs lewjli 3ala valeur mte3 l patient li houwe mte3i fl collection mte3i 
    //fel chapm esmou _id eli houwa foreignkey fl collection lo5ra utilisateurs hekke ymchi yjbedhomm 
    {
        "$lookup": {
          "from": "utilisateurs",
          "localField": "idpatient",
          "foreignField": "_id",
          "as": "infoPatient"
        }
      },
       //lene bech ijibli l info sous form dun array wahna lerray s3ib n5dmou bih objectId njmou njbdou facile donc  loperateur
    //$unwind ye5ou l array iroudou string mes kan linfo rahouu haka aleh tala3heli heke 
    {
        "$unwind": "$infoPatient"
      },
        /** be3ed mejebli li hachty bih lkol tba9a kan bch nprojectiw li n7bou alih 0 ma3nehe matale3helich w 1 ma3nehe afichiheli
     * Which 0 means, do not put and 1 means put.
      */
    {
        "$project": {
            //lene 9otlha afichili datew motif wlinfo haka aleh hatene 9odemha 1 ataw njarbou n7otou 9odem wa7de menha 0 wnchoufou chtatine
            _id : 1,
            date: 1,
          titre: 1,
          contenu: 1,
          infoPatient: 1
        }
      }
],function(err,result){
    if(err){res.json({state:'no',message:'errc!!!'+err})}
    else{res.json(result) }
})


            // reclamationModel.find({},function(err,liste){
            //     if(err){res.json({state:'no',message:'il ya un erreur'}+err)}
            //     else{res.json(liste)}
            // })
        },
    reclamationParPatient(req,res){
        reclamationModel.find({idpatient:req.params.id},function(err,list){
            if(err){res.json({state:'no',message:'il ya un erreur :: '+err})}
            else{res.json(list)}
        })
    }
}