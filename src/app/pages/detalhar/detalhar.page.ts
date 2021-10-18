import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Receita } from 'src/app/class/receita';
import { OperacoesService } from 'src/app/services/operacoes.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  public receita: Receita;

  constructor(
    private _router: Router,
    public _operacoes: OperacoesService,
  ) {  }

  ngOnInit() {
    const nav = this._router.getCurrentNavigation();
    this.receita = nav.extras.state.objeto;
    console.log(this.receita);
  } 
}
