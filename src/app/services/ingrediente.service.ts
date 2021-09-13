import { Injectable } from '@angular/core';
import { Ingrediente } from '../class/ingrediente';
import { Receita } from '../class/receita';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {
  private _ingredientes : Ingrediente[] = [];

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
    this._ingredientes = receita.getIngredientes();
  }

  public editar(ingrediente: Ingrediente, ingredienteEditado: Ingrediente): boolean{
    for(let i = 0; i < this._ingredientes.length; i++){
      if((this._ingredientes[i].getId()) == ingrediente.getId()){
        this._ingredientes[i].setQuantidade(ingredienteEditado.getQuantidade());
        this._ingredientes[i].setUnidadeMedida(ingredienteEditado.getUnidadeMedida());
        this._ingredientes[i].setNomeIngrediente(ingredienteEditado.getNomeIngrediente());        
        return true;
      }
    }
    return false;
  }

  public excluir(ingrediente: Ingrediente): boolean{
    for(let i = 0; i < this._ingredientes.length; i++){
      if((this._ingredientes[i].getId()) == ingrediente.getId()){
        this._ingredientes.splice(i, 1);
        return true;
      }
    }
    return false;
  }

}
