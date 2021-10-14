import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Ingrediente } from 'src/app/class/ingrediente';
import { Receita } from 'src/app/class/receita';
import _ from 'lodash';
import { OperacoesService } from 'src/app/services/operacoes.service';
import { ReceitaCrudService } from 'src/app/services/receita-crud.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  private _lista_receitas : Receita[];
  private _lista_ingredientes : Ingrediente[];
  private _receita : Receita;
  private _nomeReceita: string;
  private _dieta: number;
  private _tempoPreparo: string;
  private _rendimento: number;
  private _modoPreparo: string;
  private _imagem: any;
  private _ingredientes: Ingrediente[] = [];
  private _quantidade: string;
  private _unidadeMedida: string;
  private _nomeIngrediente: string;
  private _searchTerm: string;
  private _todasReceitas: any;
  private _lista_pesquisa: Receita[];
  private data_receita: any;
  private data_ingrediente: any;

  static count: number = 0;
  
  constructor(
    private _router: Router, 
    private _receitaCrud: ReceitaCrudService,
    private _operacoes: OperacoesService,
    public authService: AuthService,
    public crudReceita: ReceitaCrudService,
  ){
    this.data_receita = this._receitaCrud.getReceitas();

    this.data_receita.forEach(data => {;
      const lista = data as Array<any>;
      this._lista_receitas = [];
      
      lista.forEach(c => {
        let receita = new Receita(
          c.data._nomeReceita,
          c.data._dieta,
          c.data._tempoPreparo,
          c.data._rendimento,
          c.data._modoPreparo,
          c.data._ingredientes,
          c.data._imagem,
        );

        receita.setId(c.key);
        
        this.data_ingrediente = receita.ingredientes;
        this._lista_ingredientes = [];

        this.data_ingrediente.forEach(i => {
          let ingrediente = new Ingrediente(
            i._quantidade,
            i._unidadeMedida,
            i._nomeIngrediente,
          );

          ingrediente.setId(i._id);
          this._lista_ingredientes.push(ingrediente);
        });

        receita.setIngredientes(this._lista_ingredientes);

        this._lista_receitas.push(receita);
        console.log(this._lista_receitas);
      });
      // colocar aqui as coisas

      this._lista_pesquisa = this._lista_receitas;
      this._searchTerm = '';
      this._todasReceitas = this._lista_pesquisa;
      console.log(this._todasReceitas);
      console.log(this.authService.getUserLogado())
    });
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
      this._lista_pesquisa = _.values(this._todasReceitas);
      this._lista_pesquisa = this._lista_pesquisa.filter((receita) =>{
        return (receita.nomeReceita.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      this._lista_pesquisa = this._todasReceitas;
    }
  }

  public logout(): void{
    this.authService.signOut();
  }

  upload(event: FileList) {
    this._receitaCrud.uploadStorage(event);
  }
}
