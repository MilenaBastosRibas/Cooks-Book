import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarIngredientePageRoutingModule } from './editar-ingrediente-routing.module';

import { EditarIngredientePage } from './editar-ingrediente.page';
import { BrMaskerModule } from 'br-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrMaskerModule,
    IonicModule,
    EditarIngredientePageRoutingModule
  ],
  declarations: [EditarIngredientePage]
})
export class EditarIngredientePageModule {}
