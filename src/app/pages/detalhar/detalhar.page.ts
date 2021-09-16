import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  private _formDetalhar: FormGroup;

  constructor(
    private _router: Router,
    private _operacoes: OperacoesService,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    const nav = this._router.getCurrentNavigation();
    this._receita = nav.extras.state.objeto;
   
    this._formDetalhar = this._formBuilder.group({    
      nomeReceita:  [this._receita.getNomeReceita(), [Validators.required]],
      dieta:        [this._receita.getDieta()],
      tempoPreparo: [this._receita.getTempoPreparo(), [Validators.required]],
      rendimento:   [this._receita.getRendimento()],
      modoPreparo:  [this._receita.getModoPreparo(), [Validators.required]],
      ingredientes: [this._receita.getIngredientes()],
    });
  }

  private get errorControl(){
    return this._formDetalhar.controls;
  }

}
