import { Injectable } from '@angular/core';
import { Ingrediente } from '../class/ingrediente';
import { Receita } from '../class/receita';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {
  private _ingredientes : any[] = [];

  constructor() { }

  public getIngredientes(): Ingrediente[] {
    return this._ingredientes;
  }

  public setIngredientes(ingredientes: Ingrediente[]): void{
    this._ingredientes = ingredientes;
  }
  
  public inserir(ingrediente: Ingrediente): void{
    this._ingredientes.push(ingrediente);
  }

  public copia(receita: Receita): void{
    this._ingredientes = receita.ingredientes;
  }

  public editar(ingrediente: Ingrediente, ingredienteEditado: Ingrediente): boolean{
    for (let i = 0; i < this._ingredientes.length; i++) {
      if ((this._ingredientes[i].id) == ingrediente.id) {
        this._ingredientes[i].setQuantidade(ingredienteEditado.quantidade);
        this._ingredientes[i].setUnidadeMedida(ingredienteEditado.unidadeMedida);
        this._ingredientes[i].setNomeIngrediente(ingredienteEditado.nomeIngrediente);        
        return true;
      }
    }
    return false;
  }

  public excluir(ingrediente: any): boolean{
    for(let i = 0; i < this._ingredientes.length; i++){
      if((this._ingredientes[i].id) == ingrediente.id){
        this._ingredientes.splice(i, 1);
        return true;
      }
    }
    return false;
  }

}
