import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiCardComponent } from './swi-card.component';

describe('SwiCardComponent', () => {
  let component: SwiCardComponent;
  let fixture: ComponentFixture<SwiCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
