import { Component, OnInit } from '@angular/core';
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
  private _nomeReceita: string;
  private _dieta: number;
  private _tempoPreparo: string;
  private _rendimento: number;
  private _modoPreparo: string;
  private _ingredientes: Ingrediente[];
  private _receita: Receita;

  constructor(
    private _router: Router,
    private _toastService: ToastService,
    private _receitaService: ReceitaService,
    private _ingredienteService: IngredienteService,
    private _operacoes: OperacoesService,
  ) { }

  ngOnInit() {
    const nav = this._router.getCurrentNavigation();
    this._receita = nav.extras.state.objeto;
    this._nomeReceita = this._receita.getNomeReceita();
    this._dieta = this._receita.getDieta();
    this._tempoPreparo = this._receita.getTempoPreparo();
    this._rendimento = this._receita.getRendimento();
    this._modoPreparo = this._receita.getModoPreparo();
    this._ingredientes = this._receita.getIngredientes();
    this._ingredienteService.copia(this._receita);
  }

  private editar(): void{
    let receitaEditada: Receita = new Receita(this._nomeReceita, this._dieta, this._tempoPreparo, this._rendimento, this._modoPreparo, this._ingredientes);
    if (this._receitaService.editar(this._receita, receitaEditada)) {
      this._toastService.presentToast('Edição efetuada com sucesso!', 'success');
      this._router.navigate(['/home']);
    } else {
      this._toastService.presentToast('Edição não efetuada - receita inválido.', 'danger');
    }
  }

  private irParaEditarIngrediente(ingrediente: Ingrediente){
    this._router.navigateByUrl('/editar-ingrediente', {state: {objeto:ingrediente}});
  }

  private irParaAdicionarIngrediente(): void{
    this._router.navigate(['/adicionar-ingrediente'])
  }

  private excluirIngrediente(ingrediente: Ingrediente): void {
    this._operacoes.presentAlertConfirmIngrediente("Você deseja realmente excluir este ingrediente?", ingrediente);
  }
}
