import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { LoaderComponent } from './shared/components/loader/loader.component';

@NgModule({
  declarations: [AppComponent, LoaderComponent],
  imports: [BrowserModule, DashboardModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
