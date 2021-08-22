import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Validation } from '@nxdemos/app/core/interfaces/validation';
import { AppState } from '../../../modules/state/app.interfaces';
import { closeOrderValidationDialog } from '../../../modules/state/order/order.actions';

interface Data {
  validations: Validation[];
}

@Component({
  templateUrl: './validation-dialog.component.html',
  styleUrls: ['./validation-dialog.component.scss'],
})
export class ValidationDialogComponent implements OnInit {
  validations: Validation[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Data,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.validations = this.data.validations;
  }

  close() {
    this.store.dispatch(closeOrderValidationDialog());
  }
}
