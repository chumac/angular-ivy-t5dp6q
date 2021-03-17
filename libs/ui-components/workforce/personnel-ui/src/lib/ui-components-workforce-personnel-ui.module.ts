import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDataComponent } from './components/ss/my-data/my-data.component';
import { HrDataComponent } from './components/admin/hr-data/hr-data.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MyDataComponent, HrDataComponent],
  exports: [MyDataComponent, HrDataComponent]
})
export class UiComponentsWorkforcePersonnelUiModule {}
