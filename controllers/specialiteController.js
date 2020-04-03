const specialiteModel=require('../models/specialiteModel')
module.exports={

ajouter:function(req,res){
const specialite=new specialiteModel({nom:req.body.nom })
specialite.save(function (err) {
    if (err) {
      res.json({state: 'no', msg: 'vous avez un erreur ' + err})
    }
    else {
      res.json({state: 'ok', msg: 'specialite ajouté avec succées'})
    }

  })
},

modifier:function(req,res){
    specialiteModel.updateOne({_id:req.params.id},{nom:req.body.nom},
        function(err){
        if(err){
            res.json({state:'no' ,message:'il ya un erreur'}+err)}
        else{
           res.json({state:'ok',message:'le nom du spécialit a été mofifié avec succées'})}
    }
    )
},

afficher:function(req,res){
    specialiteModel.find({},function(err,liste){
        if(err){res.json({state:'no',message:'il ya un erreur'}+err)}
        else{res.json(liste)}
    })
},

supprimer:function(req,res){
    specialiteModel.deleteOne({_id:req.params.id},function(err){
        if(err){res.json({state:'no',message:'il ya un erreur'}+err)}
        else{res.json({state:'ok',message:'la spécialit a été supprimé avec succées'})}
    })
}




}