import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ingrediente } from 'src/app/class/ingrediente';
import { Receita } from 'src/app/class/receita';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { OperacoesService } from 'src/app/services/operacoes.service';
import { ReceitaService } from 'src/app/services/receita.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})

export class CadastrarPage implements OnInit{
  private _ingredientes: Ingrediente[] = [];
  private _formCadastrar: FormGroup;
  private _formCadastrarIngrediente: FormGroup;
  private _isSubmitted: boolean = false;

  constructor(
    private _router: Router,
    private _toastService: ToastService,
    private _receitaService: ReceitaService,
    private _ingredienteService: IngredienteService,
    private _operacoes: OperacoesService, 
    private _formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this._ingredienteService.setIngredientes(this._ingredientes);

    this._formCadastrar = this._formBuilder.group({
      nomeReceita:  ['',[Validators.required]],
      dieta:        [''],
      tempoPreparo: ['',[Validators.required]],
      rendimento:   [''],
      modoPreparo:  ['',[Validators.required]],
      ingrediente:  [''],
    });

    this._formCadastrarIngrediente = this._formBuilder.group({
      quantidade:       ['',[Validators.required]],
      unidadeMedida:    ['',[Validators.required]],
      nomeIngrediente:  ['',[Validators.required]],
    });
  }

  private get errorControl(){
    return this._formCadastrar.controls;
  }

  private get errorControlIngrediente(){
    return this._formCadastrarIngrediente.controls;
  }

  private submitForm(): boolean{
    this._isSubmitted = true;

    if(!this._formCadastrar.valid){
      this._toastService.presentToast('Preencha os campos obrigatórios.', 'danger');
      return false;
    }else{
      this.cadastrar();
    }
  }

  private submitFormIngrediente(): boolean{
    this._isSubmitted = true;
    if(!this._formCadastrarIngrediente.valid){
      this._toastService.presentToast('Todos os campos são obrigatórios.', 'danger');
      return false;
    } else {
      this.cadastrarIngrediente()
    }
  }

  public cadastrar(): void {
    if(this._ingredienteService.getIngredientes().length != 0) {
      let tempoPreparoSD = this._formCadastrar.value['tempoPreparo'].split('T')[1];
      let tempoPreparoSFHpai = tempoPreparoSD.split('-')[0];
      let tempoPreparoSFH = tempoPreparoSFHpai.split('.')[0];
      const receita: Receita = new Receita(
        this._formCadastrar.value['nomeReceita'],
        this._formCadastrar.value['dieta'],
        tempoPreparoSFH,
        this._formCadastrar.value['rendimento'],
        this._formCadastrar.value['modoPreparo'],
        this._ingredienteService.getIngredientes(),
      );
      this._receitaService.inserir(receita);
      this._toastService.presentToast('Cadastro efetuado com sucesso!', 'success');
      this._router.navigate(['/home']);
    }else {
      this._toastService.presentToast('Adicione um ingrediente.', 'danger');
    }
  }

  public cadastrarIngrediente(): void{
    let ingrediente: Ingrediente = new Ingrediente(
      this._formCadastrarIngrediente.value['quantidade'],
      this._formCadastrarIngrediente.value['unidadeMedida'],
      this._formCadastrarIngrediente.value['nomeIngrediente'],
    );
    this._ingredienteService.inserir(ingrediente);
    this._toastService.presentToast('Ingrediente cadastrado com sucesso!', 'success');
  }
}