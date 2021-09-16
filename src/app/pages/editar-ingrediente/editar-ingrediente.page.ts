import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  private _nomeIngrediente: string;
  private _editar: boolean = true;
  private _formEditarIngrediente: FormGroup;
  private _isSubmitted: boolean = false;

  constructor(
    private _router: Router,
    private _toastService: ToastService,
    private _ingredienteService: IngredienteService,
    private _operacoes: OperacoesService,
    private _formBuilder: FormBuilder,
  ){ }

  ngOnInit() {
    const nav = this._router.getCurrentNavigation();
    this._ingrediente = nav.extras.state.objeto;

    this._formEditarIngrediente = this._formBuilder.group({
      quantidade:       [this._ingrediente.getQuantidade(), [Validators.required]],
      unidadeMedida:    [this._ingrediente.getUnidadeMedida(), [Validators.required]],
      nomeIngrediente:  [this._ingrediente.getNomeIngrediente(), [Validators.required]],
    });
  }

  private get errorControl(){
    return this._formEditarIngrediente.controls;
  }

  private submitForm(): boolean{
    this._isSubmitted = true;

    if(!this._formEditarIngrediente.valid){
      this._toastService.presentToast('Preencha os campos obrigatórios.', 'danger');
      return false;
    }else{
      this.editarIngrediente();
    }
  }

  private alterarEdicao(): void{
    if(this._editar == true){
      this._editar = false;
    }else{
      this._editar = true;
    }
  }

  private editarIngrediente(): void{
    let ingredienteEditado: Ingrediente = new Ingrediente(
      this._formEditarIngrediente.value['quantidade'],
      this._formEditarIngrediente.value['unidadeMedida'],
      this._formEditarIngrediente.value['nomeIngrediente'],
    );
    this._ingredienteService.editar(this._ingrediente, ingredienteEditado);
    this._toastService.presentToast('Ingrediente editado com sucesso!', 'success');
    this._router.navigate(['/editar']);
  }

  private excluir(): void {
    if (this._ingredienteService.excluir(this._ingrediente)){
      this._toastService.presentToast('Exclusão efetuada com sucesso!', 'success');
    } else{
      this._toastService.presentToast('Ingrediente inválido!', 'danger');
    }
  }

}
