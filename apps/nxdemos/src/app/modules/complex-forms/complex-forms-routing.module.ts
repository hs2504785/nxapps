import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComplexFormsComponent } from './complex-forms.component';

const routes: Routes = [{ path: '', component: ComplexFormsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplexFormsRoutingModule { }
