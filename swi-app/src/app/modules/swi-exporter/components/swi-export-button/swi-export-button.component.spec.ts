import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiExportButtonComponent } from './swi-export-button.component';

describe('SwiExportButtonComponent', () => {
  let component: SwiExportButtonComponent;
  let fixture: ComponentFixture<SwiExportButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiExportButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiExportButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
