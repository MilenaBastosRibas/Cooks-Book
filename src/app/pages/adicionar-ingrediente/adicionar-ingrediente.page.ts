import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Ingrediente } from 'src/app/class/ingrediente';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { OperacoesService } from 'src/app/services/operacoes.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-adicionar-ingrediente',
  templateUrl: './adicionar-ingrediente.page.html',
  styleUrls: ['./adicionar-ingrediente.page.scss'],
})
export class AdicionarIngredientePage{
  private _quantidade: string;
  private _unidadeMedida: string;
  private _nomeIngrediente: string;
  
  constructor(
    private _router: Router,
    private _toastService: ToastService,
    private _ingredienteService: IngredienteService,
    private _operacoes: OperacoesService,
    ) { }
    
  public adicionarIngrediente(): void{
    if (this._operacoes.validar(this._quantidade) && this._operacoes.validar(this._unidadeMedida) && this._operacoes.validar(this._nomeIngrediente)){
      let ingrediente: Ingrediente = new Ingrediente(this._quantidade, this._unidadeMedida, this._nomeIngrediente);
      this._ingredienteService.inserir(ingrediente);
      this._toastService.presentToast('Ingrediente adicionado com sucesso!', 'success');
      this._router.navigate(['/editar']);
    } else {
      this._toastService.presentToast('Todos os campos são obrigatórios.', 'danger');
    }
  }

}
