import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdicionarIngredientePage } from './adicionar-ingrediente.page';

const routes: Routes = [
  {
    path: '',
    component: AdicionarIngredientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdicionarIngredientePageRoutingModule {}
