import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccordionModule, MDBBootstrapModulesPro, WavesModule } from 'ng-uikit-pro-standard';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {MatMenuModule} from '@angular/material/menu';

import { BeaconComponent } from './components/beacon/beacon.component';
import { BareCardComponent } from './components/bare-card/bare-card.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { HrzCommandBarComponent } from './components/hrz-command-bar/hrz-command-bar.component';
import { VrtCommandBarComponent } from './components/vrt-command-bar/vrt-command-bar.component';
import { SwitchComponent } from './components/switch/switch.component';
import { HoverIconComponent } from './components/hover-icon/hover-icon.component';
import { FormHeaderComponent } from './components/form-header/form-header.component';
import { FormFooterComponent } from './components/form-footer/form-footer.component';
import { FilePickerComponent } from './components/file-picker/file-picker.component';
import { FileDownloaderComponent } from './components/file-downloader/file-downloader.component';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { DialogBoxMdlsComponent } from './components/dialog-box-mdls/dialog-box-mdls.component';
import { ImagePickerComponent } from './components/image-picker/image-picker.component';
import { PictureCropperComponent } from './components/picture-cropper/picture-cropper.component';

import { DialogBoxService } from './services';

import { ImageCropperModule } from 'ngx-image-cropper';
import { ConcentraChartComponent } from './components/concentra-chart/concentra-chart.component';
import { ConcentriChartComponent } from './components/concentri-chart/concentri-chart.component';
import { NotificationComponent } from './components/notification/notification.component';
import { FormContainerComponent } from './components/form-container/form-container.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { EmployeeTeamCardComponent } from './components/employee-team-card/employee-team-card.component';
import { DialogBoxQinfoComponent } from './components/dialog-box-qinfo/dialog-box-qinfo.component';
import { ShimmerPlaceholderComponent } from './components/shimmer-placeholder/shimmer-placeholder.component';
import { EnterpriseStructureTreeViewComponent } from './components/enterprise-structure-tree-view/enterprise-structure-tree-view.component';
import {
  DxTreeViewModule, DxSelectBoxModule, DxPopupModule,
  DxScrollViewModule,
  DxTemplateModule, 
  DxLookupModule} from 'devextreme-angular';
import { MatTreeModule, MatIconModule, MatListModule, MatDialogModule, MatExpansionModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule } from '@angular/material';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { StructureTreeViewComponent } from './components/structure-tree-view/structure-tree-view.component';
import { OrganogramComponent } from './components/organogram/organogram.component';
import { ReportNotificationComponent } from './components/report-notification/report-notification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogService } from './services/dialog.service';
import { ExternalNotificationService } from './services';
import { SharedAppGlobalModule } from '@nutela/shared/app-global';
import { AgreementModalComponent } from './components/agreement-modal/agreement-modal.component';
import { EmployeePassportPhotoComponent } from './components/employee-passport-photo/employee-passport-photo.component';
import { OverlayLoaderComponent } from './components/overlay-loader/overlay-loader.component';
import { PreviewFilePickerComponent } from './components/preview-file-picker/preview-file-picker.component';
import { FormRendererComponent } from './components/form-renderer/form-renderer.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MDBBootstrapModulesPro.forRoot(),
    NgCircleProgressModule.forRoot({
      radius: 40,
      outerStrokeWidth: 6,
      innerStrokeWidth: 5,
      outerStrokeLinecap: "square",
      outerStrokeColor: "#ec8f56",
      innerStrokeColor: "#fff",
      backgroundStrokeWidth: 0,
      space: -5,
      showSubtitle: false,
      subtitleColor: "#fff",
      titleColor: "#fff",
      titleFontSize: "2rem",
      subtitleFontSize: "0.9rem",
      showBackground: false,
      showUnits: false,
      animationDuration: 100,
      animation: true
    }),
    ImageCropperModule,
    DxTreeViewModule,
    DxSelectBoxModule,
    DxPopupModule,
    DxScrollViewModule,
    DxTemplateModule,
    MatTreeModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    RouterModule,
    FormsModule,
    Ng2SearchPipeModule,
    MatDialogModule,
    SharedAppGlobalModule,

    DxLookupModule,
    AccordionModule,
    WavesModule,
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,

  ],
  declarations: [
    BeaconComponent,
    BareCardComponent,
    AvatarComponent,
    HrzCommandBarComponent,
    VrtCommandBarComponent,
    SwitchComponent,
    HoverIconComponent,
    FormHeaderComponent,
    FormFooterComponent,
    FilePickerComponent,
    FileDownloaderComponent,
    DialogBoxComponent,
    DialogBoxMdlsComponent,
    ImagePickerComponent,
    PictureCropperComponent,
    ConcentraChartComponent,
    ConcentriChartComponent,
    NotificationComponent,
    ReportNotificationComponent,
    FormContainerComponent,
    SpinnerComponent,
    EmployeeTeamCardComponent,
    DialogBoxQinfoComponent,
    ShimmerPlaceholderComponent,
    EnterpriseStructureTreeViewComponent,
    StructureTreeViewComponent,
    BreadcrumbComponent,
    OrganogramComponent,
    DialogComponent,
    AgreementModalComponent,
    EmployeePassportPhotoComponent,
    OverlayLoaderComponent,
    PreviewFilePickerComponent,
    FormRendererComponent
  ],
  providers: [DialogBoxService, DialogService, ExternalNotificationService],
  entryComponents: [DialogBoxMdlsComponent, DialogBoxQinfoComponent, DialogComponent],
  exports: [
    BeaconComponent,
    BareCardComponent,
    AvatarComponent,
    HrzCommandBarComponent,
    VrtCommandBarComponent,
    SwitchComponent,
    HoverIconComponent,
    FormHeaderComponent,
    FormFooterComponent,
    FilePickerComponent,
    FileDownloaderComponent,
    DialogBoxComponent,
    DialogBoxMdlsComponent,
    ImagePickerComponent,
    PictureCropperComponent,
    ConcentraChartComponent,
    ConcentriChartComponent,
    NotificationComponent,
    ReportNotificationComponent,
    FormContainerComponent,
    SpinnerComponent,
    EmployeeTeamCardComponent,
    ShimmerPlaceholderComponent,
    EnterpriseStructureTreeViewComponent,
    StructureTreeViewComponent,
    BreadcrumbComponent,
    OrganogramComponent,
    DialogComponent,
    AgreementModalComponent,
    EmployeePassportPhotoComponent,
    OverlayLoaderComponent,
    PreviewFilePickerComponent,
    FormRendererComponent
  ]
})
export class SharedUiModule { }
