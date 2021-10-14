import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Ingrediente } from '../class/ingrediente';
import { Receita } from '../class/receita';
import { IngredienteService } from './ingrediente.service';
import { ReceitaCrudService } from './receita-crud.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class OperacoesService {

  constructor(
    private _router: Router,
    private _receitaCrud: ReceitaCrudService,
    private _ingredienteService: IngredienteService,
    public alertController: AlertController,
    private _toastService: ToastService,
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
            this._receitaCrud.removeReceita(receita.id)
            .then(() => {
              this._toastService.presentToast('Exclusão efetuada.', 'success');
            })
            .catch((error) => {
              this._toastService.presentToast('Erro ao excluir.', 'danger');
              console.log(error.message);
            });
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
