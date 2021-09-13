import { Component, OnInit } from '@angular/core';
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
  private _nomeReceita: string;
  private _dieta: number;
  private _tempoPreparo: string;
  private _rendimento: number;
  private _modoPreparo: string;
  private _ingredientes: Ingrediente[] = [];
  private _quantidade: string;
  private _unidadeMedida: string;
  private _nomeIngrediente: string;

  constructor(
    private _router: Router,
    private _toastService: ToastService,
    private _receitaService: ReceitaService,
    private _ingredienteService: IngredienteService,
    private _operacoes: OperacoesService,    
  ) {
    this._tempoPreparo = new Date().toDateString();
  }

  ngOnInit() {
    this._ingredienteService.setIngredientes(this._ingredientes);
  }

  public cadastrar(): void {
    let tempoPreparoSD = this._tempoPreparo.split('T')[1];
    let tempoPreparoSFH = tempoPreparoSD.split('-')[0];

    if (this._operacoes.validar(this._nomeReceita) && this._operacoes.validar(this._modoPreparo) && (this._ingredienteService.getIngredientes().length != 0)){
      const receita: Receita = new Receita(
        this._nomeReceita, 
        this._dieta, 
        tempoPreparoSFH, 
        this._rendimento, 
        this._modoPreparo, 
        this._ingredienteService.getIngredientes()
        );
      this._receitaService.inserir(receita);
      this._toastService.presentToast('Cadastro efetuado com sucesso!', 'success');
      this._router.navigate(['/home']);
    } else {
      this._toastService.presentToast('Preencha os campos obrigatórios.', 'danger');
    }
  }

  public cadastrarIngrediente(): void{
    if (this._operacoes.validar(this._quantidade) && this._operacoes.validar(this._unidadeMedida) && this._operacoes.validar(this._nomeIngrediente)){
      let ingrediente: Ingrediente = new Ingrediente(this._quantidade, this._unidadeMedida, this._nomeIngrediente);
      this._ingredienteService.inserir(ingrediente)
      this._toastService.presentToast('Ingrediente cadastrado com sucesso!', 'success');
    } else {
      this._toastService.presentToast('Preencha os campos obrigatórios.', 'danger');
    }
  }
}