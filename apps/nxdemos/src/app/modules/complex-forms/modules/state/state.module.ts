import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../../../../environments/environment';
import { appMetaReducers, appReducer } from './app.reducer';
import { ProductEffects } from './product/product.effects';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';
import { CustomSerializer } from './shared/utils';
import { OrderEffects } from './order/order.effects';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomerEffects } from './customer/customer.effects';
import { LineItemEffects } from './line-item/line-item.effects';

@NgModule({
  imports: [
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
    }),
    StoreModule.forRoot(appReducer, { metaReducers: appMetaReducers }),
    EffectsModule.forRoot([
      CustomerEffects,
      ProductEffects,
      OrderEffects,
      LineItemEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    MatDialogModule,
    MatSnackBarModule,
  ],
  declarations: [],
})
export class StateModule {
  static forRoot(): ModuleWithProviders<StateModule> {
    return {
      ngModule: StateModule,
      providers: [
        /**
         * The `RouterStateSnapshot` provided by the `Router` is a large complex structure.
         * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
         * by `@ngrx/router-store` to include only the desired pieces of the snapshot.
         */
        {
          provide: RouterStateSerializer,
          useClass: CustomSerializer,
        },
      ],
    };
  }

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: StateModule
  ) {
    if (parentModule) {
      throw new Error(
        'StateModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
