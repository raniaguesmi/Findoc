import { Component, OnInit } from '@angular/core';
import { SpecialiteService } from 'src/app/service/specialite.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedecinService } from 'src/app/service/medecin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouter-medecin',
  templateUrl: './ajouter-medecin.component.html',
  styleUrls: ['./ajouter-medecin.component.css']
})
export class AjouterMedecinComponent implements OnInit {
  listeSpecialite;
 
  registerForm:FormGroup;
submitted = false;

  constructor(private specialiteService : SpecialiteService , private formBuilder: FormBuilder,
     private medecinService: MedecinService) {
    this.afficherSpecialite();
   }
   image;
   fileToApload: Array<File> ; // ici je veux stocker l'image a télécharger'
   emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;//paterne mte3 lemail 


  ngOnInit() {
    // amalna formulaire esmha this.registerForm

    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', [Validators.required,Validators.minLength(6)]],
      dateNaissance: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', [Validators.required,Validators.pattern(new RegExp("[0-9 ]{8}"))]],
      cin: ['', [Validators.required,Validators.pattern(new RegExp("[0-9 ]{8}"))] ],
      email: ['', [Validators.required,Validators.pattern(this.emailRegex)] ],
      adresseCabinet: ['', Validators.required],
      specialite: ['', Validators.required],

    });
  }

   get f() {
     return this.registerForm.controls;
   }
  ajouterMedecin() {
  // 
     this.submitted = true;
     console.log(this.image)
    console.log(this.fileToApload[0])
    console.log(this.registerForm.value)
if (this.registerForm.invalid) {
      return ;
   }
    this.medecinService.ajouterMedecin(this.registerForm.value, this.fileToApload[0]).subscribe(res => {
        console.log(res);
        Swal.fire(
          'Good job!',
          'Le medecin est ajouté avec succès!',
          'success')
        this.submitted = false;
        this.registerForm.reset()
      }
    )
  }

  afficherSpecialite(){
    this.specialiteService.listeSpecialite().subscribe(res=>{
      console.log(res);
      this.listeSpecialite=res; // resultat li tal3etli naffectehe l  listeSpecialité
    })
  }
   //hathi juste bech tatini esm  l file  size
   recupereFile(file) {
    this.fileToApload = file.target.files as Array<File> // je recupere le photo télécharger
    this.image = file.target.files[0].name; // ici je stocke le nom de la phpto  dans la variable image
  }
}
