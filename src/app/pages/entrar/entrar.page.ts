import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.page.html',
  styleUrls: ['./entrar.page.scss'],
})
export class EntrarPage implements OnInit {
  private _formLogar: FormGroup;
  public isSubmitted: boolean = false;
   
  constructor(
    public alertController: AlertController, 
    private _router: Router,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    private _toastService: ToastService,
  ) { }

  ngOnInit() {
    this._formLogar = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], 
      senha: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  private get errorControl(){
    return this._formLogar.controls;
  }

  private submitForm() {
    this.isSubmitted = true;
    if(!this._formLogar.valid){
      this._toastService.presentToast('Todos os campos são obrigatórios.', 'danger');
      return false;
    } else {
      this._signIn();
    }
  }

  private _signIn(){
    this.authService.signIn(this._formLogar.value['email'], this._formLogar.value['senha'])
    .then((res) => {
      this._toastService.presentToast('Seja bem-vindo!', 'success');
      this._router.navigate(['/home']);
    })
    .catch((error) => {
      this._toastService.presentToast('Erro ao logar!', 'danger');
      console.log(error.message);
    })
  }

  protected _signInGoogle() : void{
    this.authService.signInWithGoogle();
  }

  protected _signInFacebook() : void{
    this.authService.signInWithFacebook();
  }

  protected _signInTwitter() : void{
    this.authService.signInWithTwitter();
  }

  public irParaSignUp() : void{
    this._router.navigate(['/inscrever']);
  }
}
