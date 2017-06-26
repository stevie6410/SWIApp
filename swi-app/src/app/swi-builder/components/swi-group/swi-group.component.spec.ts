import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiGroupComponent } from './swi-group.component';

describe('SwiGroupComponent', () => {
  let component: SwiGroupComponent;
  let fixture: ComponentFixture<SwiGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
