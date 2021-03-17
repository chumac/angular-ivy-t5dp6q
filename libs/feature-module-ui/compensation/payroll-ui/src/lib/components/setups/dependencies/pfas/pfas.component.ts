import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { IgxGridComponent } from 'igniteui-angular';
import { Observable } from 'rxjs';
import { IPfa } from '@nutela/models/compensation/payroll';
import { PfaEditorComponent } from './pfa-editor/pfa-editor.component';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../../store/root/root.state';
import { DialogService } from '@nutela/shared/ui';
import { LoadPfaData, LoadingPfa, getPfa, isLoadingPfa, showEditorPfa, ShowEditorPfa, HideEditorPfa, DeletePfa } from '../../../../store/dependencies/pfa';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { map, take } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'x365-fm-payrl-pfas',
  templateUrl: './pfas.component.html',
  styleUrls: ['./pfas.component.scss']
})

export class PfasComponent implements OnInit {
  pfaData$: Observable<IPfa[]>;
  showEditor$: Observable<boolean>;
  isProcessing$:Observable<boolean>;
  isLoading$:Observable<boolean>;

  @ViewChild('editor') editor: PfaEditorComponent;
  @ViewChild('PfaGrid') PfaGrid: IgxGridComponent;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title, private store: Store<IRootState>, private dialogService: DialogService) {
    titleService.setTitle(
      `${'Pension Fund Administration'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();

  }

   storeDispatches() {
    this.store.dispatch(new LoadPfaData());
    this.store.dispatch(new LoadingPfa())
   }

  storeSelects() {
    this.pfaData$ = this.store.pipe(select(getPfa));
    this.isLoading$ = this.store.pipe(select(isLoadingPfa));
    this.showEditor$ = this.store.pipe(select(showEditorPfa))
  }

  getPfaData$(rowId: number): Observable<IPfa>{
    console.log('data row', rowId);
    return this.pfaData$.pipe(
      map(d => d.filter(v => v.pfa_id === rowId)),
      map(e => e.shift()))
  }


  onAdd() {
    this.editor.data = null;
    this.editor.reset()
    this.store.dispatch(new ShowEditorPfa());
  }

  onEditIconClicked(rowId) {
    this.editor.data = null;
    this.getPfaData$(rowId).pipe(take(1))
    .subscribe(result=>{
      this.editor.data = result;
      this.editor.reset();
      this.store.dispatch(new ShowEditorPfa());
    })
  }

onRefresh(){
this.store.dispatch(new LoadPfaData());
this.store.dispatch(new ShowToast({title: null, message: ` Pfa data is being refreshed.`, type: ToastTypes.INFO}));
}

onCancelEditor(){
 this.store.dispatch(new HideEditorPfa());
}

  onDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to delete this data?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeletePfa({ recordId: rowId }));
      }
    });
  }

}


