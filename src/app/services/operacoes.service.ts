import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Ingrediente } from '../class/ingrediente';
import { Receita } from '../class/receita';
import { IngredienteService } from './ingrediente.service';
import { ReceitaService } from './receita.service';

@Injectable({
  providedIn: 'root'
})
export class OperacoesService {

  constructor(
    private _router: Router,
    private _receitaService: ReceitaService,
    private _ingredienteService: IngredienteService,
    public alertController: AlertController,
  ) { }

  public validar(campo : any): boolean{
    if (!campo){
      return false
    }else{
      return true
    }
  }

  public voltar(rota: string): void{
    this._router.navigate([rota])
  }

  async presentAlertConfirmReceita(mensagem: string, receita: Receita) {
    const alert = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: mensagem,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        }, {
          text: 'Sim',
          handler: () => {
            this._receitaService.excluir(receita);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertConfirmIngrediente(mensagem: string, ingrediente: Ingrediente) {
    const alert = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: mensagem,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        }, {
          text: 'Sim',
          handler: () => {
            this._ingredienteService.excluir(ingrediente);
          }
        }
      ]
    });

    await alert.present();
  }
}
