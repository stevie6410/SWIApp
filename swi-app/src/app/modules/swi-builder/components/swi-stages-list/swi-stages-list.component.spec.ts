import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiStagesListComponent } from './swi-stages-list.component';

describe('SwiStagesListComponent', () => {
  let component: SwiStagesListComponent;
  let fixture: ComponentFixture<SwiStagesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiStagesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiStagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
