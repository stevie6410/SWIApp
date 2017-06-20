import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiGroupPickerComponent } from './swi-group-picker.component';

describe('SwiGroupPickerComponent', () => {
  let component: SwiGroupPickerComponent;
  let fixture: ComponentFixture<SwiGroupPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiGroupPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiGroupPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
