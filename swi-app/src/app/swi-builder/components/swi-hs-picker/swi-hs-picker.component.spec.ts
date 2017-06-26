import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiHsPickerComponent } from './swi-hs-picker.component';

describe('SwiHsPickerComponent', () => {
  let component: SwiHsPickerComponent;
  let fixture: ComponentFixture<SwiHsPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiHsPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiHsPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
