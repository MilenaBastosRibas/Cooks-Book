import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ingrediente } from 'src/app/class/ingrediente';
import { Receita } from 'src/app/class/receita';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { OperacoesService } from 'src/app/services/operacoes.service';
import { ReceitaService } from 'src/app/services/receita.service';
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
    private _receitaService: ReceitaService,
    private _ingredienteService: IngredienteService,
    private _operacoes: OperacoesService,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    const nav = this._router.getCurrentNavigation();
    this._receita = nav.extras.state.objeto;

    this._formEditar = this._formBuilder.group({    
      nomeReceita:  [this._receita.getNomeReceita(), [Validators.required]],
      dieta:        [this._receita.getDieta()],
      tempoPreparo: [this._receita.getTempoPreparo(), [Validators.required]],
      rendimento:   [this._receita.getRendimento()],
      modoPreparo:  [this._receita.getModoPreparo(), [Validators.required]],
      ingredientes: [this._receita.getIngredientes(), [Validators.required]],
    });

    this._ingredienteService.copia(this._receita);
    // console.log(this._formEditar)
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
    let receitaEditada: Receita = new Receita(
      this._formEditar.value['nomeReceita'],
      this._formEditar.value['dieta'],
      this._formEditar.value['tempoPreparo'],
      this._formEditar.value['rendimento'],
      this._formEditar.value['modoPreparo'],
      this._ingredienteService.getIngredientes()
    );

    if (this._receitaService.editar(this._receita, receitaEditada)) {
      this._toastService.presentToast('Edição efetuada com sucesso!', 'success');
      this._router.navigate(['/home']);
    } else {
      this._toastService.presentToast('Edição não efetuada!', 'danger');
    }

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
