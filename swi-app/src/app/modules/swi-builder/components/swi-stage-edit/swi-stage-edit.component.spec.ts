import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiStageEditComponent } from './swi-stage-edit.component';

describe('SwiStageEditComponent', () => {
  let component: SwiStageEditComponent;
  let fixture: ComponentFixture<SwiStageEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiStageEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiStageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
