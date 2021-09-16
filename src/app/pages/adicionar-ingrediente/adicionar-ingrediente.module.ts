import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdicionarIngredientePageRoutingModule } from './adicionar-ingrediente-routing.module';

import { AdicionarIngredientePage } from './adicionar-ingrediente.page';
import { BrMaskerModule } from 'br-mask';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    BrMaskerModule,
    AdicionarIngredientePageRoutingModule
  ],
  declarations: [AdicionarIngredientePage]
})
export class AdicionarIngredientePageModule {}
