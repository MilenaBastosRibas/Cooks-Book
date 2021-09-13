import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(
    private toastController: ToastController,
  ) { }

  public async presentToast(mensagem: string, tipo: string): Promise<void> {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000,
      color: tipo,
      buttons: [
        {
          text: 'x',
          role: 'cancel',
        }
      ]
    });

    toast.present();
  }
}
