import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductComponent } from './containers/product/product.component';
import { ProductListComponent } from './containers/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    ProductListComponent,
    ProductFormComponent,
    ProductsTableComponent,
  ],
  imports: [CommonModule, ProductsRoutingModule, MatButtonModule],
})
export class ProductsModule {}
