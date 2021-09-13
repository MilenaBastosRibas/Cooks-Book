import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdicionarIngredientePageRoutingModule } from './adicionar-ingrediente-routing.module';

import { AdicionarIngredientePage } from './adicionar-ingrediente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdicionarIngredientePageRoutingModule
  ],
  declarations: [AdicionarIngredientePage]
})
export class AdicionarIngredientePageModule {}
