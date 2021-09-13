import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarIngredientePageRoutingModule } from './editar-ingrediente-routing.module';

import { EditarIngredientePage } from './editar-ingrediente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarIngredientePageRoutingModule
  ],
  declarations: [EditarIngredientePage]
})
export class EditarIngredientePageModule {}
