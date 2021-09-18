import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntrarPageRoutingModule } from './entrar-routing.module';

import { EntrarPage } from './entrar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EntrarPageRoutingModule
  ],
  declarations: [EntrarPage]
})
export class EntrarPageModule {}
