import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplexFormsRoutingModule } from './complex-forms-routing.module';
import { ComplexFormsComponent } from './complex-forms.component';


@NgModule({
  declarations: [
    ComplexFormsComponent
  ],
  imports: [
    CommonModule,
    ComplexFormsRoutingModule
  ]
})
export class ComplexFormsModule { }
