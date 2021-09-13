import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ingrediente } from 'src/app/class/ingrediente';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { OperacoesService } from 'src/app/services/operacoes.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-editar-ingrediente',
  templateUrl: './editar-ingrediente.page.html',
  styleUrls: ['./editar-ingrediente.page.scss'],
})
export class EditarIngredientePage implements OnInit {
  private _ingrediente: Ingrediente;
  private _quantidade: string;
  private _unidadeMedida: string;
  private _nomeIngrediente: string;
  private _editar: boolean = true;

  constructor(
    private _router: Router,
    private _toastService: ToastService,
    private _ingredienteService: IngredienteService,
    private _operacoes: OperacoesService,
  ){ }

  ngOnInit() {
    const nav = this._router.getCurrentNavigation();
    this._ingrediente = nav.extras.state.objeto;
    this._quantidade = this._ingrediente.getQuantidade();
    this._unidadeMedida = this._ingrediente.getUnidadeMedida();
    this._nomeIngrediente = this._ingrediente.getNomeIngrediente();
  }

  private alterarEdicao(): void{
    if(this._editar == true){
      this._editar = false;
    }else{
      this._editar = true;
    }
  }

  private editarIngrediente(): void{
    let ingredienteEditado: Ingrediente = new Ingrediente(this._quantidade, this._unidadeMedida, this._nomeIngrediente);
    if (this._ingredienteService.editar(this._ingrediente, ingredienteEditado)) {
      this._toastService.presentToast('Edição efetuada com sucesso!', 'success');
      this._router.navigate(['/editar']);
    } else {
      this._toastService.presentToast('Edição não efetuada - ingrediente inválido.', 'danger');
    }
  }

  private excluir(): void {
    if (this._ingredienteService.excluir(this._ingrediente)){
      this._toastService.presentToast('Exclusão efetuada com sucesso!', 'success');
    } else{
      this._toastService.presentToast('Ingrediente inválido!', 'danger');
    }
  }

}
