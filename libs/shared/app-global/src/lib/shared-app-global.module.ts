import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  LetDirective,
  DisableControlDirective,
  NumbersOnlyDirective
} from './directives';

import { BaseFormComponent } from './forms';
import {
  DateDisplayPipe,
  DateTimeDisplayPipe,
  StringDisplayPipe,
  BooleanDisplayPipe,
  FilterPipe,
  StringWrapPipe,
  HrMinDisplayPipe,
  WorkHourLabelPipe,
  SanitizerBypassPipe
} from './pipes';

@NgModule({
  imports: [HttpClientModule],
  declarations: [
    BaseFormComponent,
    LetDirective,
    DisableControlDirective,
    NumbersOnlyDirective,
    StringDisplayPipe,
    StringWrapPipe,
    HrMinDisplayPipe,
    WorkHourLabelPipe,
    BooleanDisplayPipe,
    DateDisplayPipe,
    DateTimeDisplayPipe,
    FilterPipe,
    SanitizerBypassPipe
  ],
  providers: [],
  exports: [
    LetDirective,
    DisableControlDirective,
    NumbersOnlyDirective,
    StringDisplayPipe,
    StringWrapPipe,
    HrMinDisplayPipe,
    WorkHourLabelPipe,
    BooleanDisplayPipe,
    DateDisplayPipe,
    DateTimeDisplayPipe,
    FilterPipe,
    SanitizerBypassPipe
  ]
})
export class SharedAppGlobalModule {}
