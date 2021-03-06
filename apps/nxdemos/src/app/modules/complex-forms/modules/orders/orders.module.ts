import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { CustomerComponent } from './components/customer/customer.component';
import { LineitemsTableComponent } from './components/lineitems-table/lineitems-table.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { OrdersTableComponent } from './components/orders-table/orders-table.component';
import { OrderComponent } from './containers/order/order.component';
import { OrdersComponent } from './containers/orders/orders.component';
import { OrdersRoutingModule } from './orders-routing.module';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
    FormsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatOptionModule,
    MatSelectModule,
    MatTableModule,
    ReactiveFormsModule,
  ],
  declarations: [
    OrdersComponent,
    OrderComponent,
    CustomerComponent,
    LineitemsTableComponent,
    OrderDetailComponent,
    OrderFormComponent,
    OrdersTableComponent,
    OrderSummaryComponent,
  ],
})
export class OrdersModule {}
