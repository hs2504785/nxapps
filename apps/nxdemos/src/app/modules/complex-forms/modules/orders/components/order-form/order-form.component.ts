import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Validation } from '@nxdemos/app/core/interfaces/validation';
import { Subject } from 'rxjs';
import { debounceTime, skip, takeUntil } from 'rxjs/operators';
import { Customer } from '../../../state/customer/customer.model';
import { LineItem } from '../../../state/line-item/line-item.model';
import { Order } from '../../../state/order/order.model';
import { Product } from '../../../state/product/product.model';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnChanges, OnDestroy {
  /**
   *  formGroup = {
   *    lineItems: [
   *      {
   *        productId
   *        quantity
   *      },
   *      {
   *        productId
   *        quantity
   *      }
   *    ]
   *  }
   */
  formGroup: FormGroup;

  @Input() customers: Customer[] | null;
  @Input() order: Order | null;
  @Input() products: Product[] | null;
  @Output() lineItemsChange = new EventEmitter<any[]>();
  @Output() orderChange = new EventEmitter<any>();
  @Output() validationsChange = new EventEmitter<
    Map<AbstractControl, Validation>
  >();

  private destroyed$ = new Subject<void>();
  private validations = new Map<AbstractControl, Validation>();
  private _customer: Customer;
  private _lineItems: LineItem[] | null;

  @Input()
  set customer(customer: Customer) {
    this._customer = customer;
    if (!customer) {
      return;
    }
    this.orderChange.emit({
      ...this.order,
      customerId: customer.id || 0,
    });
  }

  get customer(): Customer {
    return this._customer;
  }

  @Input()
  set lineItems(lineItems: LineItem[] | null) {
    this._lineItems = lineItems;
    this.lineItemsChange.emit(lineItems);
  }

  get lineItems(): LineItem[] | null {
    return this._lineItems;
  }

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['order'] && changes['order'].currentValue) {
      this.formGroup.patchValue(this.order);
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onValidationChange([control, validation]: [AbstractControl, Validation]) {
    this.validations.set(control, validation);
    this.validationsChange.emit(this.validations);
  }

  onValidationDelete(control: AbstractControl) {
    if (this.validations.has(control)) {
      this.validations.delete(control);
    }
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      id: [0, Validators.required],
      customerId: [0, Validators.required],
      lineItemIds: [[], Validators.required],
    });

    this.formGroup.valueChanges
      .pipe(takeUntil(this.destroyed$), skip(1), debounceTime(500))
      .subscribe((value) => {
        if (!this.formGroup.valid) {
          return;
        }
        if (this.order && this.lineItems) {
          this.order.lineItemIds = this.lineItems.map(
            (lineItem) => lineItem.id
          );
        }
        this.lineItemsChange.emit(this.lineItems);
        this.orderChange.emit(this.order);
      });
  }
}
