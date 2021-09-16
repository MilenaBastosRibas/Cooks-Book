import { Injectable } from '@angular/core';
import { Ingrediente } from '../class/ingrediente';
import { Receita } from '../class/receita';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {
  private _receitas : Receita[] = [];
  private _ingredientes : Ingrediente[] = [];

  constructor( ) {    
    let ingrediente1 = new Ingrediente("6", "kg", "maniva");
    let ingrediente2 = new Ingrediente("2", "kg", "toucinho branco");
    let ingrediente3 = new Ingrediente("2", "kg", "toucinho defumado");
    let ingrediente4 = new Ingrediente("2", "kg", "pé de porco salgado");
    let ingrediente5 = new Ingrediente("2", "kg", "orelha de porco salgada");
    let ingrediente6 = new Ingrediente("2", "kg", "língua de porco salgada");
    let ingrediente7 = new Ingrediente("2", "kg", "rabo de porco salgado");
    let ingrediente8 = new Ingrediente("2", "kg", "lombo de porco salgado");
    let ingrediente9 = new Ingrediente("2", "kg", "costela de porco salgada");
    let ingrediente10 = new Ingrediente("3/2", "kg", "paio");
    let ingrediente11 = new Ingrediente("3/2", "kg", "chouriço");
    let ingrediente12 = new Ingrediente("3/2", "kg", "linguiça de porco");
    let ingrediente13 = new Ingrediente("4", "kg", "bucho de boi");
    let ingrediente14 = new Ingrediente("4", "kg", "charque");

    this._ingredientes.push(ingrediente1);
    this._ingredientes.push(ingrediente2);
    this._ingredientes.push(ingrediente3);
    this._ingredientes.push(ingrediente4);
    this._ingredientes.push(ingrediente5);
    this._ingredientes.push(ingrediente6);
    this._ingredientes.push(ingrediente7);
    this._ingredientes.push(ingrediente8);
    this._ingredientes.push(ingrediente9);
    this._ingredientes.push(ingrediente10);
    this._ingredientes.push(ingrediente11);
    this._ingredientes.push(ingrediente12);
    this._ingredientes.push(ingrediente13);
    this._ingredientes.push(ingrediente14);

    let receita = new Receita("Maniçoba", 3, "72:00:00", 35, "Ferva a maniva por 72 horas, mexendo durante o dia. No 4º dia acrescente as carnes e o charque. No quarto dia adicione o bucho de boi. No quinto dia acrescente o paio, o chouriço e a linguiça de porco. No 6º dia sirva e aproveite sua maniçoba.", this._ingredientes);
    this._receitas.push(receita);
  }

  public getReceitas(): Receita[] {return this._receitas;}

  public inserir(receita: Receita): void{
    this._receitas.push(receita);
  }

  public editar(receita: Receita, receitaEditada: Receita): boolean{
    for(let i = 0; i < this._receitas.length; i++){
      if((this._receitas[i].getId()) == receita.getId()){
        this._receitas[i].setNomeReceita(receitaEditada.getNomeReceita());
        this._receitas[i].setDieta(receitaEditada.getDieta());
        this._receitas[i].setTempoPreparo(receitaEditada.getTempoPreparo());
        this._receitas[i].setRendimento(receitaEditada.getRendimento());
        this._receitas[i].setModoPreparo(receitaEditada.getModoPreparo());
        
        return true;
      }
    }
    return false;
  }

  public excluir(receita: Receita): boolean{
    for(let i = 0; i < this._receitas.length; i++){
      if((this._receitas[i].getId()) == receita.getId()){
        this._receitas.splice(i, 1);
        return true;
      }
    }
    return false;
  }

}
