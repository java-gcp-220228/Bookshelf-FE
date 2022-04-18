import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomaticEntryDialogComponent } from './automatic-entry-dialog.component';

describe('AutomaticEntryDialogComponent', () => {
  let component: AutomaticEntryDialogComponent;
  let fixture: ComponentFixture<AutomaticEntryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutomaticEntryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomaticEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
