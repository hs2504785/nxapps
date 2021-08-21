import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComplexFormsComponent } from './complex-forms.component';

const routes: Routes = [
  {
    path: '',
    component: ComplexFormsComponent,
    children: [
      {
        path: 'products',
        loadChildren: () =>
          import('./modules/products/products.module').then(
            (m) => m.ProductsModule
          ),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./modules/orders/orders.module').then((m) => m.OrdersModule),
      },
      {
        path: '',
        redirectTo: 'products',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComplexFormsRoutingModule {}
