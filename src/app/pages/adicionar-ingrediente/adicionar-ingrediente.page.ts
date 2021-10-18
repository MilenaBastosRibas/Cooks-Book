import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  private _formAdicionarIngrediente: FormGroup;
  public isSubmitted: boolean = false;
  
  constructor(
    private _router: Router,
    private _toastService: ToastService,
    private _ingredienteService: IngredienteService,
    public operacoes: OperacoesService,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this._formAdicionarIngrediente = this._formBuilder.group({
      quantidade:       ['',[Validators.required]],
      unidadeMedida:    ['',[Validators.required]],
      nomeIngrediente:  ['',[Validators.required]],
    });
  }

  private get errorControl(){
    return this._formAdicionarIngrediente.controls;
  }

  public submitForm(): boolean{
    this.isSubmitted = true;

    if(!this._formAdicionarIngrediente.valid){
      this._toastService.presentToast('Preencha os campos obrigatórios.', 'danger');
      return false;
    }else{
      this.adicionarIngrediente();
    }
  }
    
  public adicionarIngrediente(): void{
    let ingrediente: Ingrediente = new Ingrediente(
      this._formAdicionarIngrediente.value['quantidade'],
      this._formAdicionarIngrediente.value['unidadeMedida'],
      this._formAdicionarIngrediente.value['nomeIngrediente'],
    );
    this._ingredienteService.inserir(ingrediente);
    this._toastService.presentToast('Ingrediente cadastrado com sucesso!', 'success');
    this._router.navigate(['/editar']);
  }

}
