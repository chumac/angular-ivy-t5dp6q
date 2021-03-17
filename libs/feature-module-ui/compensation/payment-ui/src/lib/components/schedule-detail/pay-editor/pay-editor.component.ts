import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../store';
import { MDBModalRef, MDBModalService, ModalDirective } from 'ng-uikit-pro-standard';
import { PayEditorService } from './pay-editor.service';
import { Observable } from 'rxjs';
import { IPayProcess, ISchedule } from '@nutela/models/compensation/payment';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes, BaseFormComponent } from '@nutela/shared/app-global';
import { take, takeWhile } from 'rxjs/operators';
import { getSingleScheduleData, isProcessingScheduleDetail, SavePaymentProcessScheduleDetailFailure, ProcessingScheduleDetail, SavePaymentProcessScheduleDetail, isPaymentSuccess } from '../../../store/schedule-details';

@Component({
  selector: 'x365-fm-cmp-payment-pay-editor',
  templateUrl: './pay-editor.component.html',
  styleUrls: ['./pay-editor.component.scss']
})
export class PayEditorComponent extends BaseFormComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public isAdmin: boolean;
  @Input() public width: number;
  @Input() public scheduleId: number;
  @Input() public amount: number;;

  isProcessing$: Observable<boolean>;
  isPaymentSuccess$: Observable<boolean>;
  scheduleData$: Observable<ISchedule>;

  @Output() cancelClick = new EventEmitter<any>();
  @Output() showForm = new EventEmitter<any>();

  @ViewChild('frame') frame: ModalDirective;

  constructor(
    public utilService: UtilService,
    private store: Store<IRootState>,
    public modalRef: MDBModalRef,
    public fs: PayEditorService,
    public service: MDBModalService
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingScheduleDetail))
    this.isPaymentSuccess$ = this.store.pipe(select(isPaymentSuccess))
    this.scheduleData$ = this.store.pipe(select(getSingleScheduleData))
  };

  additionalCards = [
    {
      name: 'myNewCard',
      fullName: 'My New Card',
      re: /^9[47]\d{0,13}/,
      pattern: /(\d{1,4})/g,
      maxLength: 19,
      cvvLength: 4
    },
    {
      name: 'myNewCard1',
      fullName: 'My New Card 1',
      re: /^(?:39\d{0,2})\d{0,12}/,
      pattern: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
      maxLength: 16,
      cvvLength: 3
    },
  ];

  onClosed(event) {
    this.scheduleId = null;
    this.amount = null
    this.fs.f.reset();

    this.isPaymentSuccess$.subscribe(v => {
      if (v) {
        this.store.dispatch(new SavePaymentProcessScheduleDetailFailure());
      }
    });
  }

  onShowForm() {
    this.frame.show()
  }

  onSubmit() {
    if (this.fs.valid) {
      this.store.dispatch(new ProcessingScheduleDetail());
      this.store.dispatch(new SavePaymentProcessScheduleDetail({ scheduleID: this.scheduleId, data: <IPayProcess>this.fs.value }));
      this.isPaymentSuccess$.subscribe(v => {
        if (v) {
          this.frame.hide();
        }
      })
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  };

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
