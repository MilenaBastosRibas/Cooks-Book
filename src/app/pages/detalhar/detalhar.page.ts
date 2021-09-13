import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ingrediente } from 'src/app/class/ingrediente';
import { Receita } from 'src/app/class/receita';
import { OperacoesService } from 'src/app/services/operacoes.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  private _receita: Receita;
  private _nomeReceita: string;
  private _dieta: number;
  private _tempoPreparo: string;
  private _rendimento: number;
  private _modoPreparo: string;
  private _lista_ingredientes: Ingrediente[];

  constructor(
    private _router: Router,
    private _operacoes: OperacoesService,
  ) { }

  ngOnInit() {
    const nav = this._router.getCurrentNavigation();
    this._receita = nav.extras.state.objeto;
    this._nomeReceita = this._receita.getNomeReceita();
    this._dieta = this._receita.getDieta();
    this._tempoPreparo = this._receita.getTempoPreparo();
    this._rendimento = this._receita.getRendimento();
    this._modoPreparo = this._receita.getModoPreparo();
    this._lista_ingredientes = this._receita.getIngredientes();
  }

}
