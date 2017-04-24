import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiToolEditComponent } from './swi-tool-edit.component';

describe('SwiToolEditComponent', () => {
  let component: SwiToolEditComponent;
  let fixture: ComponentFixture<SwiToolEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiToolEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiToolEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
