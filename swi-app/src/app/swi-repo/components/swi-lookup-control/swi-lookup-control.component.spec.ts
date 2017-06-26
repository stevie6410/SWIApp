import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiLookupControlComponent } from './swi-lookup-control.component';

describe('SwiLookupControlComponent', () => {
  let component: SwiLookupControlComponent;
  let fixture: ComponentFixture<SwiLookupControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiLookupControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiLookupControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
