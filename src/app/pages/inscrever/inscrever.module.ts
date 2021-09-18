import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscreverPageRoutingModule } from './inscrever-routing.module';

import { InscreverPage } from './inscrever.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    InscreverPageRoutingModule
  ],
  declarations: [InscreverPage]
})
export class InscreverPageModule {}
