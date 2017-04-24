import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiCategoryPickerComponent } from './swi-category-picker.component';

describe('SwiCategoryPickerComponent', () => {
  let component: SwiCategoryPickerComponent;
  let fixture: ComponentFixture<SwiCategoryPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiCategoryPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiCategoryPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
