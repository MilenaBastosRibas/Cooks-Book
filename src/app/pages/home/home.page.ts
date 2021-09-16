import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Ingrediente } from 'src/app/class/ingrediente';
import { Receita } from 'src/app/class/receita';
import { ReceitaService } from 'src/app/services/receita.service';
import _ from 'lodash';
import { OperacoesService } from 'src/app/services/operacoes.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  private _lista_receitas : Receita[];
  private _receita : Receita;
  private _nomeReceita: string;
  private _dieta: number;
  private _tempoPreparo: string;
  private _rendimento: number;
  private _modoPreparo: string;
  private _ingredientes: Ingrediente[] = [];
  private _quantidade: string;
  private _unidadeMedida: string;
  private _nomeIngrediente: string;
  private _searchTerm: string;
  private _todasReceitas: any;
  
  constructor(
    private _router: Router, 
    private _receitaService: ReceitaService,
    private _operacoes: OperacoesService,
  ){
    this._lista_receitas = this._receitaService.getReceitas();
    this._searchTerm = '';
    this._todasReceitas = this._lista_receitas;
  }

  ngOnInit() { }

  private irParaCadastrar(): void{
    this._router.navigate(["/cadastrar"])
  }

  private detalhar(receita):void {
    this._router.navigateByUrl("/detalhar", {state: {objeto:receita}})
  }

  private irParaEditar(receita): void{
    this._router.navigateByUrl("/editar", {state: {objeto:receita}})
  }

  private excluir(receita: Receita): void {
    this._operacoes.presentAlertConfirmReceita("Você deseja realmente excluir esta receita?", receita);
  }

  private filterReceitas(receita: any){
    let val = receita.target.value;
    if(val && val.trim() != ''){
      this._lista_receitas = _.values(this._todasReceitas);
      this._lista_receitas = this._lista_receitas.filter((receita) =>{
        return (receita.getNomeReceita().toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      this._lista_receitas = this._todasReceitas;
    }
  }
}
