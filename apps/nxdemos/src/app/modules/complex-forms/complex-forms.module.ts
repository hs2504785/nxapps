import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplexFormsRoutingModule } from './complex-forms-routing.module';
import { ComplexFormsComponent } from './complex-forms.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ToolbarComponent } from '../../shared/components/toolbar/toolbar.component';
import { StateModule } from './modules/state/state.module';

@NgModule({
  declarations: [ComplexFormsComponent, ToolbarComponent],
  imports: [
    CommonModule,
    ComplexFormsRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    StateModule.forRoot(),
  ],
})
export class ComplexFormsModule {}
