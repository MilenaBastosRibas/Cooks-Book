import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ingrediente } from 'src/app/class/ingrediente';
import { Receita } from 'src/app/class/receita';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { OperacoesService } from 'src/app/services/operacoes.service';
import { ReceitaCrudService } from 'src/app/services/receita-crud.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  private _receita: Receita;
  private _formEditar: FormGroup;
  private _isSubmitted: boolean = false;

  constructor(
    private _router: Router,
    private _toastService: ToastService,
    private _receitaCrud: ReceitaCrudService,
    private _ingredienteService: IngredienteService,
    private _operacoes: OperacoesService,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    const nav = this._router.getCurrentNavigation();
    this._receita = nav.extras.state.objeto;

    this._formEditar = this._formBuilder.group({    
      nomeReceita: [this._receita.nomeReceita, [Validators.required]],
      dieta: [this._receita.dieta],
      tempoPreparo: [this._receita.tempoPreparo, [Validators.required]],
      rendimento: [this._receita.rendimento],
      modoPreparo: [this._receita.modoPreparo, [Validators.required]],
      ingredientes: [this._receita.ingredientes, [Validators.required]],
      image: [this._receita.imagem],
    });

    this._ingredienteService.copia(this._receita);
    console.log(this._formEditar)
  }

  private submitForm() : boolean{
    this._isSubmitted = true;

    if(!this._formEditar.valid){
      this._toastService.presentToast('Todos os campos são obrigatórios.', 'danger');
      return false;
    } else {
      this.editar()
    }
  }

  private editar() : void{
    let receita: Receita = new Receita(
      this._formEditar.value['nomeReceita'],
      this._formEditar.value['dieta'],
      this._formEditar.value['tempoPreparo'],
      this._formEditar.value['rendimento'],
      this._formEditar.value['modoPreparo'],
      this._ingredienteService.getIngredientes(),
      this._formEditar.value['imagem'],
    );
    
    this._receitaCrud.editReceita(this._receita.id, receita)
      .then(() => {
        this._toastService.presentToast('Edição efetuada com sucesso!', 'success');
        this._router.navigate(['/home']);
      })
      .catch((error) => {
        this._toastService.presentToast('Erro ao editar.', 'danger');
        console.log(error.message);
      });
  }

  private irParaEditarIngrediente(ingrediente : Ingrediente){
    this._router.navigateByUrl('/editar-ingrediente', {state: {objeto:ingrediente}});
  }

  private irParaAdicionarIngrediente() : void{
    this._router.navigate(['/adicionar-ingrediente'])
  }

  private excluirIngrediente(ingrediente : Ingrediente) : void {
    this._operacoes.presentAlertConfirmIngrediente("Você deseja realmente excluir este ingrediente?", ingrediente);
  }
}
