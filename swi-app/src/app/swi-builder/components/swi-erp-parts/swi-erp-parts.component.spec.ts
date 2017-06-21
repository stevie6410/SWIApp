import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiErpPartsComponent } from './swi-erp-parts.component';

describe('SwiErpPartsComponent', () => {
  let component: SwiErpPartsComponent;
  let fixture: ComponentFixture<SwiErpPartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiErpPartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiErpPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
