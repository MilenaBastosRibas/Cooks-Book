import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { OperacoesService } from 'src/app/services/operacoes.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-inscrever',
  templateUrl: './inscrever.page.html',
  styleUrls: ['./inscrever.page.scss'],
})
export class InscreverPage implements OnInit {
  private _formInscrever: FormGroup;
  private _isSubmitted: boolean = false;
  
  constructor(
    public alertController: AlertController, 
    private _router: Router,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    private _toastService: ToastService,
    public operacoes: OperacoesService,
  ) { }

  ngOnInit() {
    this._formInscrever = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], 
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confSenha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  private get errorControl(){
    return this._formInscrever.controls;
  }

  submitForm() {
    this._isSubmitted = true;
    if(!this._formInscrever.valid){
      this._toastService.presentToast('Todos os campos são obrigatórios.', 'danger');
      return false;
    } else {
      this._signUp();
    }
  }

  private _signUp(){
    this.authService.signUpWithEmailAndPassword(this._formInscrever.value['email'], this._formInscrever.value['senha'])
    .then((res) => {
      this._toastService.presentToast('Cadastro efetuado com sucesso!', 'success');
      this._router.navigate(['/entrar']);
    })
    .catch((error) => {
      this._toastService.presentToast('Erro ao cadastrar!', 'danger');
      console.log(error.message);
    })
  }
}
