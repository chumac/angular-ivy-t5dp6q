import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDownloaderComponent } from './file-downloader.component';

describe('FileDownloaderComponent', () => {
  let component: FileDownloaderComponent;
  let fixture: ComponentFixture<FileDownloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileDownloaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDownloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
